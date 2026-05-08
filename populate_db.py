"""
Script pour remplir la base de données avec des données fictives.
Exécuter avec : python manage.py shell < populate_db.py
OU copier dans : management/commands/populate_db.py et lancer : python manage.py populate_db
"""

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.db import transaction

User = get_user_model()

# ── Importer vos modèles (adapter selon votre projet) ──
try:
    from accounts.models import TutorProfile, StudentProfile
    HAS_PROFILES = True
except ImportError:
    HAS_PROFILES = False
    print("⚠️  Modèles TutorProfile/StudentProfile non trouvés — création users seulement")

# ────────────────────────────────────────────────
# DONNÉES FICTIVES
# ────────────────────────────────────────────────

TUTORS_DATA = [
    {
        "first_name": "Ahmed",
        "last_name": "Benali",
        "email": "ahmed.benali@smarttutor.dz",
        "username": "ahmed.benali",
        "password": "Pass1234!",
        "bio": "Professeur de mathématiques avec 8 ans d'expérience. Spécialisé dans le lycée et le supérieur.",
        "phone": "0550123456",
        "city": "Alger",
        "hourly_rate": 1500,
        "years_experience": 8,
        "education": "Master Mathématiques — USTHB",
        "language": "Arabe, Français",
        "subjects": ["Mathématiques", "Physique", "Statistiques"],
        "levels": ["Lycée", "Université"],
    },
    {
        "first_name": "Fatima",
        "last_name": "Hadj",
        "email": "fatima.hadj@smarttutor.dz",
        "username": "fatima.hadj",
        "password": "Pass1234!",
        "bio": "Enseignante de français langue étrangère. Cours de grammaire, expression écrite et orale.",
        "phone": "0661234567",
        "city": "Oran",
        "hourly_rate": 1200,
        "years_experience": 5,
        "education": "Licence Lettres Françaises — Université d'Oran",
        "language": "Français, Arabe",
        "subjects": ["Français", "Littérature", "Expression écrite"],
        "levels": ["Collège", "Lycée", "Adultes"],
    },
    {
        "first_name": "Karim",
        "last_name": "Meziane",
        "email": "karim.meziane@smarttutor.dz",
        "username": "karim.meziane",
        "password": "Pass1234!",
        "bio": "Ingénieur informaticien reconverti en tuteur. Cours de programmation Python, Java et développement web.",
        "phone": "0770987654",
        "city": "Constantine",
        "hourly_rate": 2000,
        "years_experience": 6,
        "education": "Ingénieur en Informatique — ENP",
        "language": "Français, Anglais, Arabe",
        "subjects": ["Informatique", "Python", "Java", "Web"],
        "levels": ["Université", "Lycée", "Professionnels"],
    },
    {
        "first_name": "Sonia",
        "last_name": "Rahmani",
        "email": "sonia.rahmani@smarttutor.dz",
        "username": "sonia.rahmani",
        "password": "Pass1234!",
        "bio": "Docteure en chimie, passionnée par l'enseignement des sciences. Préparation aux concours.",
        "phone": "0555432100",
        "city": "Alger",
        "hourly_rate": 1800,
        "years_experience": 10,
        "education": "Doctorat Chimie — USTHB",
        "language": "Français, Arabe",
        "subjects": ["Chimie", "Sciences naturelles", "Biologie"],
        "levels": ["Lycée", "Université", "Prépa"],
    },
    {
        "first_name": "Youcef",
        "last_name": "Boudaoud",
        "email": "youcef.boudaoud@smarttutor.dz",
        "username": "youcef.boudaoud",
        "password": "Pass1234!",
        "bio": "Professeur d'anglais certifié IELTS. Cours de conversation, business English et préparation aux examens.",
        "phone": "0662345678",
        "city": "Annaba",
        "hourly_rate": 1600,
        "years_experience": 7,
        "education": "Master Anglais — Université Badji Mokhtar",
        "language": "Anglais, Français, Arabe",
        "subjects": ["Anglais", "IELTS", "TOEFL", "Business English"],
        "levels": ["Tous niveaux"],
    },
    {
        "first_name": "Meriem",
        "last_name": "Taleb",
        "email": "meriem.taleb@smarttutor.dz",
        "username": "meriem.taleb",
        "password": "Pass1234!",
        "bio": "Spécialiste en économie et gestion. Cours de comptabilité, finance et management.",
        "phone": "0771234000",
        "city": "Alger",
        "hourly_rate": 1700,
        "years_experience": 4,
        "education": "Master Finance — HEC Alger",
        "language": "Français, Arabe",
        "subjects": ["Économie", "Comptabilité", "Finance", "Management"],
        "levels": ["Lycée", "Université"],
    },
    {
        "first_name": "Rachid",
        "last_name": "Kaci",
        "email": "rachid.kaci@smarttutor.dz",
        "username": "rachid.kaci",
        "password": "Pass1234!",
        "bio": "Architecte et enseignant en dessin technique et modélisation 3D. AutoCAD, Revit.",
        "phone": "0550678901",
        "city": "Tizi Ouzou",
        "hourly_rate": 2200,
        "years_experience": 9,
        "education": "Architecte DPLG — École Polytechnique",
        "language": "Français, Kabyle, Arabe",
        "subjects": ["Architecture", "Dessin technique", "AutoCAD"],
        "levels": ["Université", "Professionnels"],
    },
    {
        "first_name": "Nadia",
        "last_name": "Oussaid",
        "email": "nadia.oussaid@smarttutor.dz",
        "username": "nadia.oussaid",
        "password": "Pass1234!",
        "bio": "Professeure de physique au lycée. Méthodes pédagogiques adaptées, cours particuliers et en groupe.",
        "phone": "0660111222",
        "city": "Blida",
        "hourly_rate": 1300,
        "years_experience": 3,
        "education": "Licence Physique — Université Saad Dahleb",
        "language": "Arabe, Français",
        "subjects": ["Physique", "Mathématiques"],
        "levels": ["Collège", "Lycée"],
    },
]

STUDENTS_DATA = [
    {
        "first_name": "Imane",
        "last_name": "Benyahia",
        "email": "imane.benyahia@email.com",
        "username": "imane.benyahia",
        "password": "Pass1234!",
        "phone": "0550000001",
        "city": "Alger",
        "bio": "Étudiante en 2ème année Licence Mathématiques. Cherche de l'aide en Analyse.",
    },
    {
        "first_name": "Mohamed",
        "last_name": "Amrani",
        "email": "mohamed.amrani@email.com",
        "username": "mohamed.amrani",
        "password": "Pass1234!",
        "phone": "0660000002",
        "city": "Oran",
        "bio": "Lycéen en Terminale Sciences. Prépare le BAC, besoin d'aide en Physique-Chimie.",
    },
    {
        "first_name": "Sara",
        "last_name": "Ferhat",
        "email": "sara.ferhat@email.com",
        "username": "sara.ferhat",
        "password": "Pass1234!",
        "phone": "0770000003",
        "city": "Constantine",
        "bio": "Étudiante Master 1 Informatique. Cherche un tuteur Python et Machine Learning.",
    },
    {
        "first_name": "Hamza",
        "last_name": "Ouali",
        "email": "hamza.ouali@email.com",
        "username": "hamza.ouali",
        "password": "Pass1234!",
        "phone": "0550000004",
        "city": "Alger",
        "bio": "Collégien en 4ème. Difficultés en maths et en français.",
    },
    {
        "first_name": "Yasmine",
        "last_name": "Belkadi",
        "email": "yasmine.belkadi@email.com",
        "username": "yasmine.belkadi",
        "password": "Pass1234!",
        "phone": "0661000005",
        "city": "Annaba",
        "bio": "Professionnelle cherchant à améliorer son anglais pour des opportunités à l'étranger.",
    },
    {
        "first_name": "Amine",
        "last_name": "Djoudi",
        "email": "amine.djoudi@email.com",
        "username": "amine.djoudi",
        "password": "Pass1234!",
        "phone": "0770000006",
        "city": "Tizi Ouzou",
        "bio": "Étudiant en école de commerce. Cherche aide en comptabilité et finance.",
    },
    {
        "first_name": "Rania",
        "last_name": "Saadi",
        "email": "rania.saadi@email.com",
        "username": "rania.saadi",
        "password": "Pass1234!",
        "phone": "0550000007",
        "city": "Blida",
        "bio": "Lycéenne 1ère AS. Prépare le concours médecine, besoin d'aide en SVT et Chimie.",
    },
    {
        "first_name": "Bilal",
        "last_name": "Hamdani",
        "email": "bilal.hamdani@email.com",
        "username": "bilal.hamdani",
        "password": "Pass1234!",
        "phone": "0660000008",
        "city": "Alger",
        "bio": "Étudiant en architecture 3ème année. Cherche aide en dessin technique et AutoCAD.",
    },
    {
        "first_name": "Lina",
        "last_name": "Bouazza",
        "email": "lina.bouazza@email.com",
        "username": "lina.bouazza",
        "password": "Pass1234!",
        "phone": "0770000009",
        "city": "Oran",
        "bio": "Terminale Lettres. Cherche aide en littérature française et expression écrite.",
    },
    {
        "first_name": "Sofiane",
        "last_name": "Medjdoub",
        "email": "sofiane.medjdoub@email.com",
        "username": "sofiane.medjdoub",
        "password": "Pass1234!",
        "phone": "0550000010",
        "city": "Constantine",
        "bio": "Ingénieur reconverti, apprend Python et développement web en autodidacte.",
    },
]


# ────────────────────────────────────────────────
# FONCTIONS DE CRÉATION
# ────────────────────────────────────────────────

def get_or_create_group(name):
    group, created = Group.objects.get_or_create(name=name)
    if created:
        print(f"  ✅ Groupe '{name}' créé")
    return group


def create_tutor(data, group):
    # Créer ou récupérer le user
    if User.objects.filter(username=data['username']).exists():
        print(f"  ⏭️  Tuteur {data['username']} existe déjà — ignoré")
        return None

    user = User.objects.create_user(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        first_name=data['first_name'],
        last_name=data['last_name'],
    )
    user.groups.add(group)
    user.save()

    # Créer le profil tuteur si le modèle existe
    if HAS_PROFILES:
        try:
            profile, _ = TutorProfile.objects.get_or_create(user=user)
            profile.bio = data.get('bio', '')
            profile.phone = data.get('phone', '')
            profile.city = data.get('city', '')
            profile.hourly_rate = data.get('hourly_rate', 0)
            profile.years_experience = data.get('years_experience', 0)
            profile.education = data.get('education', '')
            profile.language = data.get('language', '')
            profile.save()
        except Exception as e:
            print(f"  ⚠️  Profil tuteur non créé pour {data['username']}: {e}")

    print(f"  ✅ Tuteur créé : {user.get_full_name()} ({user.email})")
    return user


def create_student(data, group):
    if User.objects.filter(username=data['username']).exists():
        print(f"  ⏭️  Étudiant {data['username']} existe déjà — ignoré")
        return None

    user = User.objects.create_user(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        first_name=data['first_name'],
        last_name=data['last_name'],
    )
    user.groups.add(group)
    user.save()

    if HAS_PROFILES:
        try:
            profile, _ = StudentProfile.objects.get_or_create(user=user)
            profile.bio = data.get('bio', '')
            profile.phone = data.get('phone', '')
            profile.city = data.get('city', '')
            profile.save()
        except Exception as e:
            print(f"  ⚠️  Profil étudiant non créé pour {data['username']}: {e}")

    print(f"  ✅ Étudiant créé : {user.get_full_name()} ({user.email})")
    return user


# ────────────────────────────────────────────────
# EXÉCUTION
# ────────────────────────────────────────────────

def run():
    print("\n" + "="*55)
    print("  🚀 SmartTutor — Remplissage de la base de données")
    print("="*55)

    with transaction.atomic():
        # Groupes
        print("\n📁 Création des groupes...")
        tutor_group   = get_or_create_group('Tuteur')
        student_group = get_or_create_group('Étudiant')

        # Tuteurs
        print(f"\n👨‍🏫 Création de {len(TUTORS_DATA)} tuteurs...")
        tutors_created = 0
        for data in TUTORS_DATA:
            user = create_tutor(data, tutor_group)
            if user:
                tutors_created += 1

        # Étudiants
        print(f"\n🎓 Création de {len(STUDENTS_DATA)} étudiants...")
        students_created = 0
        for data in STUDENTS_DATA:
            user = create_student(data, student_group)
            if user:
                students_created += 1

    print("\n" + "="*55)
    print(f"  ✅ {tutors_created} tuteur(s) créé(s)")
    print(f"  ✅ {students_created} étudiant(s) créé(s)")
    print("="*55)
    print("\n📋 Identifiants de connexion :")
    print("  Mot de passe pour tous : Pass1234!")
    print("\n  Exemples tuteurs :")
    for d in TUTORS_DATA[:3]:
        print(f"    • {d['username']} / Pass1234!")
    print("\n  Exemples étudiants :")
    for d in STUDENTS_DATA[:3]:
        print(f"    • {d['username']} / Pass1234!")
    print()


if __name__ == '__main__':
    run()
else:
    # Appelé via `python manage.py shell < populate_db.py`
    run()
