export type Database = {
  public: {
    Tables: {
      news_articles: {
        Row: {
          id: string;
          title: string;
          summary: string | null;
          url: string;
          source: string | null;
          category: string | null;
          importance: number | null;
          published_at: string | null;
          created_at: string;
          is_validated: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          summary?: string | null;
          url: string;
          source?: string | null;
          category?: string | null;
          importance?: number | null;
          published_at?: string | null;
          created_at?: string;
          is_validated?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          summary?: string | null;
          url?: string;
          source?: string | null;
          category?: string | null;
          importance?: number | null;
          published_at?: string | null;
          created_at?: string;
          is_validated?: boolean;
        };
      };
      earnings: {
        Row: {
          id: string;
          ticker: string;
          company_name: string | null;
          period: string | null;
          eps_forecast: number | null;
          eps_actual: number | null;
          revenue_forecast: number | null;
          revenue_actual: number | null;
          beat: boolean | null;
          announced_at: string | null;
          stock_price_before: number | null;
          stock_price_after: number | null;
        };
        Insert: {
          id?: string;
          ticker: string;
          company_name?: string | null;
          period?: string | null;
          eps_forecast?: number | null;
          eps_actual?: number | null;
          revenue_forecast?: number | null;
          revenue_actual?: number | null;
          beat?: boolean | null;
          announced_at?: string | null;
          stock_price_before?: number | null;
          stock_price_after?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["earnings"]["Insert"]>;
      };
      stocks: {
        Row: {
          ticker: string;
          name_ja: string | null;
          name_en: string | null;
          sector: string | null;
          market: string | null;
          updated_at: string;
        };
        Insert: {
          ticker: string;
          name_ja?: string | null;
          name_en?: string | null;
          sector?: string | null;
          market?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["stocks"]["Insert"]>;
      };
      column_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          author_id: string | null;
          content: string | null;
          tags: string[] | null;
          thumbnail_url: string | null;
          reading_time: number | null;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          author_id?: string | null;
          content?: string | null;
          tags?: string[] | null;
          thumbnail_url?: string | null;
          reading_time?: number | null;
          published_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["column_posts"]["Insert"]>;
      };
      authors: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          avatar_url: string | null;
          twitter_url: string | null;
          youtube_url: string | null;
          follower_count: string | null;
          investment_style: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          bio?: string | null;
          avatar_url?: string | null;
          twitter_url?: string | null;
          youtube_url?: string | null;
          follower_count?: string | null;
          investment_style?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["authors"]["Insert"]>;
      };
      trending_cache: {
        Row: {
          id: string;
          type: string;
          keyword: string;
          score: number;
          related_tickers: string[] | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          keyword: string;
          score: number;
          related_tickers?: string[] | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["trending_cache"]["Insert"]>;
      };
      newsletter_subs: {
        Row: {
          id: string;
          email: string;
          confirmed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          confirmed?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["newsletter_subs"]["Insert"]>;
      };
    };
  };
};
