# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.urls import reverse
from ...main.exceptions import const, method_not_allowed

from .models import Resume
from .forms import UploadResumeForm


def index(request):
    if not request.user.is_authenticated():
        return redirect(const.redirect_403)

    resumes = Resume.objects.get_all()
    context = {
        "resumes": resumes
    }
    return render(request, 'db_resume/index.html', context)


def upload(request):
    if not request.user.is_authenticated():
        return redirect(const.redirect_403)

    if request.method == 'POST':
        _xHeader = {
            'value': 'False',
            'label': 'X-Form-Errors',   # documents whether form has errors
        }
        result = {
            'title': "",
            'message': ""
        }

        form = UploadResumeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            result['title'] = "Upload Saved"
            result['message'] = "The file was successfully uploaded."
            html = render_to_string('db_projects/edit_response.html', result)
        else:
            # errors in the form submission
            _xHeader['value'] = 'True'
            context = {
                'form': form,
                'form_errors': True
            }
            html = render_to_string('db_resume/create.html', context, request)

        _http_response = HttpResponse(html)
        _http_response.__setitem__(_xHeader['label'], _xHeader['value'])
        return _http_response
    return redirect(reverse('db_admin:resume'))


def list(request):
    if not request.user.is_authenticated():
        return redirect(const.redirect_403)

    resumes = Resume.objects.get_all()
    context = {
        "resumes": resumes
    }
    http = render_to_string('db_resume/list.html', context, request)
    return HttpResponse(http)


def destroy(request, id):
    if not request.user.is_authenticated():
        return redirect(const.redirect_403)

    res = get_object_or_404(Resume, id=id)
    res.delete()
    return redirect(reverse('db_admin:resume'))