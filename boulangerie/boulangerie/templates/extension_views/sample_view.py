### recupère l'utilistauer actuelle qui sera nécéssaire pour savoir si un utilistaur est connecté et si oui lequel

def sample_view(request):
    current_user = request.user
    return current_user.id