import base64
import falcon
from nlp.keywords import top_words, summary
from falcon_cors import CORS
class TaggerResource(object):
    """Returns a list of n most relevant words"""

    def on_post(self, req, resp):

        # TODO: check for num_words
        # TODO: check for body_text

        is_file = req.media.get('is_file')
        num_words = req.media.get('num_words')
        body_text = req.media.get('body_text')	
        file_data = req.media.get('file')

        #if is_file is None:
        #    resp.status = falcon.HTTP_400
        #    resp.media = {
        #                     "success": False,
        #                     "error": "Bad Request",
        #                     "message": "Missing file indicator boolean.",
        #                     "data": {}
        #                 }
        #    return

        #if num_words is None:
        #    resp.status = falcon.HTTP_400
        #    resp.media = {
        #                     "success": False,
        #                     "error": "Bad Request",
        #                     "message": "Missing file indicator boolean.",
        #                     "data": {}
        #                 }
        #    return

        #if is_file is not None:
        #    try:
        #        body_text = base64.b64decode(file_data)
        #    except TypeError as e:
        #        resp.status = falcon.HTTP_500
        #        resp.media = {
        #                         "success": False,
        #                         "error": "Internal Server Error",
        #                         "message": "Unable to parse file contents.",
        #                         "data": {}
        #                     }
        #        return
        #else:
        #    if body_text is None or len(body_text) == 0:
        #        resp.status = falcon.HTTP_400
        #        resp.media = {
        #                         "success": False,
        #                         "error": "Bad Request",
        #                         "message": "Missing body text.",
        #                         "data": {}
        #                     }
        #        return

        if is_file is True:
            try:
                body_text = base64.b64decode(file_data).strip().decode("utf-8")
            except:
                resp.status = falcon.HTTP_500
                resp.media = {
                                 "success": False,
                                 "error": "Internal Server Error",
                                 "message": "Unable to decode file.",
                                 "data": {}
                             }
                return
    

        words = top_words(body_text, n=int(num_words))
        words = [{"word": k, "value": "{:.2f}".format(v)} for (k, v) in words]

        percentage = 0.2
        text_summary = summary(body_text, percentage)

        if top_words is not None: 
            resp.status = falcon.HTTP_200
            resp.media = {
                             "success": True,
                             "error": "None",
                             "message": "Successfully returned keywords.",
                             "data": {
                                         "summary": text_summary,
                                         "percentage": int(percentage*100),
                                         "keywords": words
                                     } 
                         }
        else:
            raise falcon.HTTPInternalServerError(
                'Unable to process request.',
                'Cannot create tags from given text.'
            )

    def get_tags():
        return 

cors=CORS(allow_all_origins=True, allow_all_methods=True, allow_all_headers=True)
app = falcon.API(middleware=[cors.middleware])

tagger = TaggerResource()

app.add_route('/keywords', tagger)
