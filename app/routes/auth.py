# from flask import request
# from werkzeug.security import check_password_hash
# from flask import jsonify
# from ..models.User import User
# from .index import router
#
#
# @router.route('/login', methods=['POST'])
# def login():
#     email = request.json.get('email', None)
#     password = request.json.get('password', None)
#
#     try:
#         user = User.query.find_one({"Email": email})
#
#         if user is None:
#             raise Exception("User not found")
#
#         valid = check_password_hash(user['password'], password)
#         if not valid:
#             raise Exception('Password not correct')
#
#         token = create_access_token(identity=user['id'], expires_delta=None)
#
#         result = { 'token': token }
#         return jsonify(result), 200
#     except Exception as e:
#         return jsonify({'Error': repr(e)})
#
#
# @router.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():
#     jti = get_jwt()['jti']
#     blacklist.add(jti)
#     return jsonify({"message": "Successfully logged out"}), 200
#
