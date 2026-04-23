# ✅ views.py — correct way

import os
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from groq import Groq

ABUZER_PROFILE = """
Name: AbuZar Ali
Stack: React, Next.js, Django, Python, Tailwind, REST APIs, Groq AI
Projects: Git Smart (Django + Groq AI), Git Insights (Next.js)
Status: Seeking internship in Lahore. Available immediately.
"""

@api_view(['POST'])
def analyze_fit(request):
    # ✅ Client created here — GROQ_API_KEY is loaded by now
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    jd = request.data.get('job_description', '').strip()
    if not jd:
        return Response({'error': 'No job description provided.'}, status=400)

    prompt = f"""
You are AbuZar Ali's portfolio AI.
Profile: {ABUZER_PROFILE}
Job description: {jd}

Respond ONLY in this JSON format:
{{
  "match_score": <0-100>,
  "matching_skills": ["skill1", "skill2"],
  "missing_skills": ["skill1"],
  "relevant_project": {{"name": "...", "reason": "..."}},
  "pitch": "2-3 sentence pitch",
  "verdict": "Strong Match" or "Good Match" or "Partial Match"
}}
"""
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=400,
        )
        raw = response.choices[0].message.content
        clean = raw.strip().replace("```json", "").replace("```", "").strip()
        return Response(json.loads(clean))
    except json.JSONDecodeError:
        return Response({'error': 'AI parsing failed. Try again.'}, status=500)
    except Exception as e:
        return Response({'error': str(e)}, status=500)