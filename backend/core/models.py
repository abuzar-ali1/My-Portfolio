from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    # In Django, we use a TextField or JSONField for arrays
    tech_stack = models.JSONField(default=list) 
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image_url = models.CharField(max_length=500) 
    
    ai_insight = models.TextField(blank=True, null=True) 
    
    created_at = models.DateTimeField(auto_auto_now_add=True)

    def __str__(self):
        return self.title