from .index import router


@router.route('/hello')
def hello():
    return 'Hello, World'
