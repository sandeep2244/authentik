"""event utilities"""
import re
from dataclasses import asdict, is_dataclass
from pathlib import Path
from typing import Any, Optional
from uuid import UUID

from django.contrib.auth.models import AnonymousUser
from django.core.handlers.wsgi import WSGIRequest
from django.db import models
from django.db.models.base import Model
from django.http.request import HttpRequest
from django.views.debug import SafeExceptionReporterFilter
from geoip2.models import City
from guardian.utils import get_anonymous_user

from authentik.blueprints.v1.common import YAMLTag
from authentik.core.models import User
from authentik.events.geo import GEOIP_READER
from authentik.policies.types import PolicyRequest

# Special keys which are *not* cleaned, even when the default filter
# is matched
ALLOWED_SPECIAL_KEYS = re.compile("passing", flags=re.I)


def cleanse_item(key: str, value: Any) -> Any:
    """Cleanse a single item"""
    if isinstance(value, dict):
        return cleanse_dict(value)
    if isinstance(value, list):
        for idx, item in enumerate(value):
            value[idx] = cleanse_item(key, item)
        return value
    try:
        if SafeExceptionReporterFilter.hidden_settings.search(
            key
        ) and not ALLOWED_SPECIAL_KEYS.search(key):
            return SafeExceptionReporterFilter.cleansed_substitute
    except TypeError:  # pragma: no cover
        return value
    return value


def cleanse_dict(source: dict[Any, Any]) -> dict[Any, Any]:
    """Cleanse a dictionary, recursively"""
    final_dict = {}
    for key, value in source.items():
        new_value = cleanse_item(key, value)
        if new_value is not ...:
            final_dict[key] = new_value
    return final_dict


def model_to_dict(model: Model) -> dict[str, Any]:
    """Convert model to dict"""
    name = str(model)
    if hasattr(model, "name"):
        name = model.name
    return {
        "app": model._meta.app_label,
        "model_name": model._meta.model_name,
        "pk": model.pk,
        "name": name,
    }


def get_user(user: User, original_user: Optional[User] = None) -> dict[str, Any]:
    """Convert user object to dictionary, optionally including the original user"""
    if isinstance(user, AnonymousUser):
        user = get_anonymous_user()
    user_data = {
        "username": user.username,
        "pk": user.pk,
        "email": user.email,
    }
    if original_user:
        original_data = get_user(original_user)
        original_data["on_behalf_of"] = user_data
        return original_data
    return user_data


# pylint: disable=too-many-return-statements
def sanitize_item(value: Any) -> Any:
    """Sanitize a single item, ensure it is JSON parsable"""
    if is_dataclass(value):
        # Because asdict calls `copy.deepcopy(obj)` on everything that's not tuple/dict,
        # and deepcopy doesn't work with HttpRequests (neither django nor rest_framework).
        # Currently, the only dataclass that actually holds an http request is a PolicyRequest
        if isinstance(value, PolicyRequest):
            value.http_request = None
        value = asdict(value)
    if isinstance(value, dict):
        return sanitize_dict(value)
    if isinstance(value, list):
        new_values = []
        for item in value:
            new_value = sanitize_item(item)
            if new_value:
                new_values.append(new_value)
        return new_values
    if isinstance(value, (User, AnonymousUser)):
        return sanitize_dict(get_user(value))
    if isinstance(value, models.Model):
        return sanitize_dict(model_to_dict(value))
    if isinstance(value, UUID):
        return value.hex
    if isinstance(value, (HttpRequest, WSGIRequest)):
        return ...
    if isinstance(value, City):
        return GEOIP_READER.city_to_dict(value)
    if isinstance(value, Path):
        return str(value)
    if isinstance(value, Exception):
        return str(value)
    if isinstance(value, YAMLTag):
        return str(value)
    if isinstance(value, type):
        return {
            "type": value.__name__,
            "module": value.__module__,
        }
    return value


def sanitize_dict(source: dict[Any, Any]) -> dict[Any, Any]:
    """clean source of all Models that would interfere with the JSONField.
    Models are replaced with a dictionary of {
        app: str,
        name: str,
        pk: Any
    }"""
    final_dict = {}
    for key, value in source.items():
        new_value = sanitize_item(value)
        if new_value is not ...:
            final_dict[key] = new_value
    return final_dict
