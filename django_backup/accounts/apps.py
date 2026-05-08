from django.apps import AppConfig


class AccountsConfig(AppConfig):
    # FIX : default_auto_field pour éviter les warnings de migration
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    def ready(self):
        # Importer les signaux si vous en avez (ex: post_save pour créer le profil)
        # import accounts.signals  # décommentez quand signals.py existe
        pass