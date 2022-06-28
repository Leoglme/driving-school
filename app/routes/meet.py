from .index import router


@router.route('/hello')
def hello():
    return 'Hello, World'


@router.route("/url", methods=['GET'])
def url():
    return 'hello url'
