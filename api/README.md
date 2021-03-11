# **API**

**POST** /api/v1/user/signup

#### Request

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
    Body:
      - name: string
      - email: string
      - password: string

#### Response

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
    Body:
      - success: boolean
      - payload: any

**POST** /api/v1/user/signin

#### Request

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
    Body:
      - email: string
      - password: string

#### Response

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
      - uuid: string

    Body:
      - success: boolean
      - payload: any

**GET** /api/v1/user/logout

#### Request

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
      - uuid: string

#### Response

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
    Body:
      - success: boolean
      - payload: any

**GET** /api/v1/user/search?name=string&email=email&exact=boolean&order=string&limit=number&offset=number

#### Request

    URL:
      - name: string
      - email: string
      - only name or email should be specified
      - exact: boolean (true | false)
      - exact = true will match exact name or email = value
      - order: string (asc | desc)
      - limit: number
      - offset: number

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
      - uuid: string

#### Response

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
    Body:
      - success: boolean
      - payload: any

**GET** /api/v1/user/listing?field=string&order=string&limit=number&offset=number

#### Request

    URL:
      - field: string (last_access)
      - order: string (asc | desc)
      - limit: number
      - offset: number

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
      - uuid: string

#### Response

    Head:
      - X-Device: string (desktop | mobile | tablet)
      - X-Locate: string (en-US | vi-VN | ...)
    Body:
      - success: boolean
      - payload: any
