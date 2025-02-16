-- ENUMの作成
CREATE TYPE auth_provider AS ENUM ('google');
CREATE TYPE mood_icon AS ENUM ('happy');
CREATE TYPE diary_status AS ENUM ('init', 'writting', 'completed');
CREATE TYPE diary_room_status AS ENUM ('active', 'inactive');

-- User テーブル
CREATE TABLE public."User" (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Account テーブル
CREATE TABLE public."Account" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public."User" NOT NULL,
  provider auth_provider NOT NULL,
  provider_account_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(provider, provider_account_id)
);

-- Diary テーブル
CREATE TABLE public."Diary" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public."User" NOT NULL,
  date DATE NOT NULL,
  summary TEXT,
  mood_icon mood_icon,
  status diary_status DEFAULT 'init' NOT NULL,
  locked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- DiaryRoom テーブル
CREATE TABLE public."DiaryRoom" (
  diary_id UUID REFERENCES public."Diary" NOT NULL,
  status diary_room_status DEFAULT 'active' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (diary_id),
  UNIQUE (diary_id, status)
);

-- DiaryRoomAiMessage テーブル
CREATE TABLE public."DiaryRoomAiMessage" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diary_room_id UUID REFERENCES public."DiaryRoom"(diary_id) NOT NULL,
  content TEXT NOT NULL,
  timestamps TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- DiaryRoomUserMessage テーブル
CREATE TABLE public."DiaryRoomUserMessage" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diary_room_id UUID REFERENCES public."DiaryRoom"(diary_id) NOT NULL,
  user_id UUID REFERENCES public."User" NOT NULL,
  content TEXT NOT NULL,
  timestamps TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- DiaryComment テーブル
CREATE TABLE public."DiaryComment" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  diary_id UUID REFERENCES public."Diary" NOT NULL,
  user_id UUID REFERENCES public."User" NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 更新日時を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 各テーブルに更新日時トリガーを設定
CREATE TRIGGER update_user_updated_at
  BEFORE UPDATE ON "User"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_account_updated_at
  BEFORE UPDATE ON "Account"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_diary_updated_at
  BEFORE UPDATE ON "Diary"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_diary_room_updated_at
  BEFORE UPDATE ON "DiaryRoom"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_diary_room_ai_message_updated_at
  BEFORE UPDATE ON "DiaryRoomAiMessage"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_diary_room_user_message_updated_at
  BEFORE UPDATE ON "DiaryRoomUserMessage"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_diary_comment_updated_at
  BEFORE UPDATE ON "DiaryComment"
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();