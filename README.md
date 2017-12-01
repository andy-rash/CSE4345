# ATTS API
Andy Rash

## Request Keywords

### Endpoint
`POST https://atts.me/keywords`

### Request Headers
* `Content-Type: application/json`
 
### Parameters
**Required:**
* `is_file` - `<Boolean>` - boolean value indicating whether the keyword extraction should take place on a file or raw text
* `num_words` - `<Int>` - integer containing the desired number of keywords to return

**Optional (depending on value of `is_file` above):**
* `body_text` - `<String>` - the body text from which to extract keywords
    * quotation marks must be replaced with apostrophes ('), and newlines must be replaced with '\n' before being included in the request in order to conform to the JSON standard
* `file` - `<String>` - base 64 encoded version of the text file

### Response Headers
* `Content-Type: application/json`

### Response
* `success` - `<Boolean>` - boolean value indicating whether request was successful
* `error` - `<String>` - general error statement (e.g. `Bad Request`)
* `message` - `<String>` - specific error message (e.g. `Missing body text.`)
* `data` - `<Dict>` - JSON dictionary containing either nothing on an error or the response data on success

**On success**
On a successful request, the `data` dictionary will be populated with the following values:
* `summary` - `<String>` - the summarized text
* `reduction` - `<Integer>` - an integer in [0,100) representing the percent reduction between original body text and the summary
* `keywords` - `<Array>` - JSON array containing dictionaries with the keyword/value pair
    * `word` - `<String>` - an extracted keyword
    * `value` - `<String>` - the value assigned to the keyword by the algorithm

### Example Request
+ Request (application/json)
**`is_file` = false**
```json
    {
        "is_file": false,
        "num_words": 5,
        "body_text": "People in England who commit the most serious crimes of animal cruelty could face up to five years in prison, the government has said. The move - an increase on the current six-month maximum sentence - follows a number of cases where English courts wanted to hand down tougher sentences. Especially against tiger. tiger tiger tiger. Environment Secretary Michael Gove said it would target 'those who commit the most shocking cruelty towards animals.' 23 people died today. 24 will have died tommorow. Mike Tyson fights tiger with a broom. The RSPCA said it would 'deter people from abusing and neglecting animals'.",
        "file": null
    }
```

+ Request (application/json)
**`is_file` = true**
```json
    {
        "is_file": true,
        "num_words": 5,
        "body_text": null,
        "file": "UGVvcGxlIGluIEVuZ2xhbmQgd2hvIGNvbW1pdCB0aGUgbW9zdCBzZXJpb3VzIGNyaW1lcyBvZiBhbmltYWwgY3J1ZWx0eSBjb3VsZCBmYWNlIHVwIHRvIGZpdmUgeWVhcnMgaW4gcHJpc29uLCB0aGUgZ292ZXJubWVudCBoYXMgc2FpZC4gVGhlIG1vdmUgLSBhbiBpbmNyZWFzZSBvbiB0aGUgY3VycmVudCBzaXgtbW9udGggbWF4aW11bSBzZW50ZW5jZSAtIGZvbGxvd3MgYSBudW1iZXIgb2YgY2FzZXMgd2hlcmUgRW5nbGlzaCBjb3VydHMgd2FudGVkIHRvIGhhbmQgZG93biB0b3VnaGVyIHNlbnRlbmNlcy4gRXNwZWNpYWxseSBhZ2FpbnN0IHRpZ2VyLiB0aWdlciB0aWdlciB0aWdlci4gRW52aXJvbm1lbnQgU2VjcmV0YXJ5IE1pY2hhZWwgR292ZSBzYWlkIGl0IHdvdWxkIHRhcmdldCAndGhvc2Ugd2hvIGNvbW1pdCB0aGUgbW9zdCBzaG9ja2luZyBjcnVlbHR5IHRvd2FyZHMgYW5pbWFscy4nIDIzIHBlb3BsZSBkaWVkIHRvZGF5LiAyNCB3aWxsIGhhdmUgZGllZCB0b21tb3Jvdy4gTWlrZSBUeXNvbiBmaWdodHMgdGlnZXIgd2l0aCBhIGJyb29tLiBUaGUgUlNQQ0Egc2FpZCBpdCB3b3VsZCAnZGV0ZXIgcGVvcGxlIGZyb20gYWJ1c2luZyBhbmQgbmVnbGVjdGluZyBhbmltYWxzJy4K"
    }
```

### Example Response
+ Response 200 (application/json)
```json
    {
        "success": true,
        "error": "None",
        "message": "Successfully returned keywords.",
        "data": {
            "summary":"The quick brown fox jumpeth over the lazy dog",
            "reduction":78,
            "keywords": [
                {
                    "word": "michael",
                    "value": "39.0"
                },
                {
                    "word": "secretary",
                    "value": "39.0"
                },
                {
                    "word": "environment",
                    "value": "39.0"
                },
                {
                    "word": "gove",
                    "value": "39.0"
                },
                {
                    "word": "current",
                    "value": "34.0"
                }
            ]
        }
    }
```

### Errors

+ Response 400 (application/json)
```json
    {
            "success": false,
            "error": "Bad Request",
            "message": "Missing file indicator boolean.",
            "data": {}
    }
```

+ Response 400 (application/json)
```json
        {
            "success": false,
            "error": "Bad Request",
            "message": "Malformed body text.",
            "data": {}
        }
```

+ Response 400 (application/json)
```json
        {
            "success": false,
            "error": "Bad Request",
            "message": "Missing body text.",
            "data": {}
        }
```

+ Response 400 (application/json)
```json
        {
            "success": false,
            "error": "Bad Request",
            "message": "Malformed number of words to retrieve.",
            "data": {}
        }
```

+ Response 400 (application/json)
```json
        {
            "success": false,
            "error": "Bad Request",
            "message": "Missing number of words to retrieve.",
            "data": {}
        }
```

+ Response 400 (application/json)
```json
        {
            "success": false,
            "error": "Bad Request",
            "message": "Missing file contents.",
            "data": {}
        }
```

+ Response 500 (application/json)
```json
        {
            "success": false,
            "error": "Internal Server Error",
            "message": "Unable to parse file contents.",
            "data": {}
        }
```

+ Response 500 (application/json)
```json
        {
            "success": false,
            "error": "Internal Server Error",
            "message": "Unable to extract keywords from given text.",
            "data": {}
        }
```

# Backend Setup

The ATTS API is a Falcon app served with Gunicorn through the Caddy webserver on a Digital Ocean droplet.

## Falcon

[Falcon](https://falconframework.org/) is a Python framework designed for speed and reliability. It compiles using Cython when it can, so it has low latency compared to other Python web framworks. Falcon uses very simple syntax, allowing for endpoints to be written quickly while maintaining code quality.

## Gunicorn

[Gunicorn](http://gunicorn.org/) is used to daemonize the Falcon app. The Gunicorn server is made further reliable through the use of a SystemD service. The configuration is below.

**gunicorn@.service**
```
[Unit]
Description=Gunicorn instance serving the ATTS API
Documentation=http://docs.gunicorn.org/en/stable
After=network.target

[Service]
User=%i
WorkingDirectory=/home/andy/CSE4345/src
Environment="PATH=/home/andy/.local/share/virtualenvs/CSE4345-doDay4dT/bin"
ExecStart=/home/andy/.local/share/virtualenvs/CSE4345-doDay4dT/bin/gunicorn -w 4 tagger:app
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Caddy
Requests are served to the Falcon app through a [Caddy webserver](https://caddyserver.com/). Caddy allows for incredibly simple, yet powerful webserver configuration. It enables HTTPS by default for secure communications, but the configuration is significantly simpler than other choices such as Nginx or Apache. For our use, the Caddy server has been made into a SystemD service in order to run continously. The configuration is below.

**caddy@.service**
```
[Unit]
Description=Caddy HTTP/2 web server %I
Documentation=https://caddyserver.com/docs
After=network.target

[Service]
User=%i
Environment=STNORESTART=yes
ExecStart=/usr/local/bin/caddy -agree=true -conf=/home/andy/CSE4345/config/dev/caddy/Caddyfile
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Digital Ocean
The API is hosted on a [Digital Ocean](https://www.digitalocean.com) droplet. Digital Ocean allows for very quick turnaround and complete customization when setting up hosting.

# Word-Embedding
LJ Brown

## Experiments With Word Embedding 

In this repository we test diffrent techniques to map all unique words found in a corpus to vectors in a vector space. The idea, and hope, is that some relationships between words found in the corpus will be preserved through this mapping and will manifest as characteristics of the word vectors. [More Information On Vector Representations Of Words](https://www.tensorflow.org/tutorials/word2vec)

1. Build a co-occurrence matrix from a corpus which represents how frequently word pairs occur together.

1. Search for word vectors with the soft constraint that given a word vector pair, their inner product will yield a value close to the two values in the co-occurrence matrix associated with those two words.

Methods implimented in this repository for decomposing the cooccurence matrix into word vectors:

* Stochastic Gradient Descent, which draws heavily on the implementations by "Word2vec" and "GloVe"

* Methods usgin Eigen Decomposition and Singular Value Decomposition.
