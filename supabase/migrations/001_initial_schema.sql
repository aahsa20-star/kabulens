-- ============================================
-- Kabu Lens - Initial Database Schema
-- ============================================

-- 銘柄マスタ
CREATE TABLE IF NOT EXISTS stocks (
  ticker text PRIMARY KEY,
  name_ja text,
  name_en text,
  sector text,
  market text,  -- "プライム" / "スタンダード" / "グロース"
  updated_at timestamptz DEFAULT now()
);

-- コラムライター
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  avatar_url text,
  twitter_url text,
  youtube_url text,
  follower_count text,
  investment_style text
);

-- ニュース記事
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text,
  url text NOT NULL UNIQUE,
  source text,
  category text,
  importance int DEFAULT 1 CHECK (importance BETWEEN 1 AND 5),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  is_validated boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles (category);
CREATE INDEX IF NOT EXISTS idx_news_validated ON news_articles (is_validated);

-- 決算データ
CREATE TABLE IF NOT EXISTS earnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticker text NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
  company_name text,
  period text,
  eps_forecast numeric,
  eps_actual numeric,
  revenue_forecast numeric,
  revenue_actual numeric,
  beat boolean,
  announced_at timestamptz,
  stock_price_before numeric,
  stock_price_after numeric
);

CREATE INDEX IF NOT EXISTS idx_earnings_ticker ON earnings (ticker);
CREATE INDEX IF NOT EXISTS idx_earnings_announced ON earnings (announced_at DESC);

-- コラム記事
CREATE TABLE IF NOT EXISTS column_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  author_id uuid REFERENCES authors(id) ON DELETE SET NULL,
  content text,
  tags text[],
  thumbnail_url text,
  reading_time int,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_columns_slug ON column_posts (slug);
CREATE INDEX IF NOT EXISTS idx_columns_published ON column_posts (published_at DESC);

-- メルマガ登録者
CREATE TABLE IF NOT EXISTS newsletter_subs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  confirmed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- news_articles: 全員読み取り可・書き込みはサービスロールのみ
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_read_news"
  ON news_articles FOR SELECT
  USING (true);

-- earnings: 全員読み取り可
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_read_earnings"
  ON earnings FOR SELECT
  USING (true);

-- stocks: 全員読み取り可
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_read_stocks"
  ON stocks FOR SELECT
  USING (true);

-- column_posts: 全員読み取り可
ALTER TABLE column_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_read_columns"
  ON column_posts FOR SELECT
  USING (true);

-- authors: 全員読み取り可
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_read_authors"
  ON authors FOR SELECT
  USING (true);

-- newsletter_subs: INSERTのみ全員可・SELECTはサービスロールのみ
ALTER TABLE newsletter_subs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone_can_subscribe"
  ON newsletter_subs FOR INSERT
  WITH CHECK (true);

-- ============================================
-- Seed: 初期銘柄データ
-- ============================================
INSERT INTO stocks (ticker, name_ja, name_en, sector, market) VALUES
  ('7203', 'トヨタ自動車', 'Toyota Motor Corp', '輸送用機器', 'プライム'),
  ('6758', 'ソニーグループ', 'Sony Group Corp', '電気機器', 'プライム'),
  ('6861', 'キーエンス', 'Keyence Corp', '電気機器', 'プライム'),
  ('9984', 'ソフトバンクグループ', 'SoftBank Group Corp', '情報・通信業', 'プライム'),
  ('9983', 'ファーストリテイリング', 'Fast Retailing Co', '小売業', 'プライム'),
  ('7974', '任天堂', 'Nintendo Co', 'その他製品', 'プライム'),
  ('6098', 'リクルートHD', 'Recruit Holdings Co', 'サービス業', 'プライム'),
  ('4063', '信越化学工業', 'Shin-Etsu Chemical Co', '化学', 'プライム'),
  ('6367', 'ダイキン工業', 'Daikin Industries', '機械', 'プライム'),
  ('9433', 'KDDI', 'KDDI Corp', '情報・通信業', 'プライム'),
  ('8035', '東京エレクトロン', 'Tokyo Electron', '電気機器', 'プライム'),
  ('6501', '日立製作所', 'Hitachi', '電気機器', 'プライム'),
  ('8306', '三菱UFJ FG', 'Mitsubishi UFJ Financial Group', '銀行業', 'プライム'),
  ('7267', '本田技研工業', 'Honda Motor Co', '輸送用機器', 'プライム'),
  ('8766', '東京海上HD', 'Tokio Marine Holdings', '保険業', 'プライム')
ON CONFLICT (ticker) DO NOTHING;

-- Seed: 初期ライターデータ
INSERT INTO authors (name, bio, twitter_url, youtube_url, follower_count, investment_style) VALUES
  ('田中 太郎', '登録者数45万人の株式投資チャンネル運営。元証券会社アナリスト。テクニカル分析を中心に日本株の投資戦略を発信中。', 'https://twitter.com/tanaka_kabu', 'https://youtube.com/@tanaka_kabu', '45万人', 'テクニカル重視'),
  ('鈴木 花子', '外資系運用会社で15年の経験を持つ独立系アナリスト。半導体・テクノロジーセクターのグローバル比較分析が専門。', 'https://twitter.com/suzuki_analyst', NULL, '2.8万人', 'ファンダメンタル重視'),
  ('山田 一郎', 'FP1級・投資歴20年の個人投資家。高配当株と優待銘柄を中心とした長期投資スタイル。著書「配当生活への道」。', 'https://twitter.com/yamada_fp', 'https://youtube.com/@yamada_haito', '1.5万人', '長期・配当重視')
ON CONFLICT DO NOTHING;
