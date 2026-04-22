# core/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from groq import Groq
import os, json

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

ABUZER_PROFILE = """
Name: AbuZar Ali
Stack: React, Next.js, Tailwind CSS, JavaScript, TypeScript (building),
       Django, Python, Django REST Framework, REST APIs,
       Groq AI / Llama integration
Projects:
  - Git Smart: Django app with live AI using Groq Llama model
  - Git Insights: GitHub analytics dashboard in Next.js + Tailwind
  - Dummy Shop, Fresh Cart: React ecommerce with Redux
  - Weather App: Next.js + TypeScript + React Query
Status: Seeking internship in Lahore. Available immediately. Self-taught.
"""

@api_view(['POST'])
def analyze_fit(request):
    jd = request.data.get('job_description', '').strip()
    if not jd:
        return Response({'error': 'No job description provided.'}, status=400)
    if len(jd) > 3000:
        return Response({'error': 'Job description too long.'}, status=400)

    prompt = f"""
You are AbuZar Ali's portfolio AI assistant.

AbuZar's profile:
{ABUZER_PROFILE}

A recruiter pasted this job description:
{jd}

Respond ONLY in this exact JSON format, no extra text:
{{
  "match_score": <integer 0-100>,
  "matching_skills": ["skill1", "skill2", "skill3"],
  "missing_skills": ["skill1"],
  "relevant_project": {{
    "name": "project name",
    "reason": "one sentence why it is relevant"
  }},
  "pitch": "2-3 sentence personalized pitch for this specific role. First person. Confident but honest.",
  "verdict": "Strong Match" | "Good Match" | "Partial Match"
}}
"""

    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=400,
        )
        raw = response.choices[0].message.content
        # Strip any markdown fences if model adds them
        clean = raw.strip().replace("```json", "").replace("```", "").strip()
        result = json.loads(clean)
        return Response(result)
    except json.JSONDecodeError:
        return Response({'error': 'AI response parsing failed. Try again.'}, status=500)
    except Exception as e:
        return Response({'error': str(e)}, status=500)