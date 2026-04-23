
-- Students table (hall ticket lookup)
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hall_ticket_no TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  course TEXT NOT NULL,
  semester TEXT NOT NULL,
  batch_year TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Results table (subject-wise marks)
CREATE TABLE public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  max_marks INTEGER NOT NULL DEFAULT 100,
  marks_obtained INTEGER NOT NULL,
  grade TEXT,
  status TEXT NOT NULL CHECK (status IN ('Pass','Fail')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_results_student ON public.results(student_id);

-- Enquiries
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Support tickets
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Students/results: allow public SELECT (the result lookup is public-by-design,
-- protected by requiring both hall_ticket_no AND date_of_birth in app logic).
CREATE POLICY "Public can read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Public can read results"  ON public.results  FOR SELECT USING (true);

-- Enquiries: anyone can insert; reads locked down (no admin UI yet)
CREATE POLICY "Anyone can submit enquiries" ON public.enquiries
  FOR INSERT WITH CHECK (true);

-- Support tickets: anyone can submit; reads locked down
CREATE POLICY "Anyone can submit support tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (true);
