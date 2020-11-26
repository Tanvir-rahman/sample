# Web Application Test
## Theme
Please implement web application which is able to show murmur(=tweet) by user. (this application is similar to Twitter)

## Specifications
* The user can follow other users.
* By following, a list of murmurs posted by other users is displayed in the timeline.
* The user can post murmur as many times as he wants.
* Only the user who posted can delete his murmur.
* The user can add LIKE to another person's murmur.

### DB
There are two sample tables in this application.
Please consider and add columns to below tables.
Further more I think you need more tables, so it's possible to add new tables depending on below specification.

e.g.
* murmurs
* users

### Sever
Please implement REST API. There are three sample endpoints below.
I think you need more endpoints, so you add more endpoints as needed

e.g.
* `[GET] /api/murmurs/`
* `[POST] /api/me/murmurs/`
* `[DELETE] /api/me/murmurs/:id/`

### Client
Please implement below function. If you want to add new function after complete to implement below function, it's possible to add and we evaluate your original function.

 * Timeline
   * List of Murmur information (e.g. text, LIKE count)
   * LIKE button each murmur.
   * Show 10 murmur per page. (need to implement pagination)
 * Murmur Detail
   * Murmur Information (e.g. text, LIKE count)
 * Own User Detail 
   * User information (e.g. name, followCount, followedCount)
   * List of own murmurs
   * Button for delete a murmur
 * Other User Detail
   * User information (e.g. name, followCount, followedCount)
   * List of the user's murmurs

### Point
* You can proceed with the implementation freely.
* Of course, you can also search the Web or refer to the books you have.
* The deadline is one week after the assignment is handed over. The date and time will be announced separately.
* Please aim to implement all the features in client and backend. CSS is not evaluated, so the minimum design style is fine.
* You can ask any questions about the content. If any question, please send email to uemura1shi.1104@gmail.com. Please note that I do not guarantee an immediate reply.

## How to proceed with development
1. Fork this repository into your account.
1. Give the administrator privileges of forked repository to the following email address.  
 ・ ryou318@gmail.com  
 ・ uemura1shi.1104@gmail.com
1. Create a develop branch from a main branch.
1. Create the feature branch for the develop branch each. e.g.) `/develop/{{your_name}}`, submit a pull request as appropriate, and merge it into your develop branch.
1. When development is complete, create a Pull request for the main branch and add Appeal Points, Implemented Features, Unimplemented Features, and Impressions for this testing to the Pull request overview.

## How to start the development environment
### Programming Language
* Typescript
* Javascript

note: Please program by Typescript as much as possible. The Typescript ratio in your project is also evaluated.

### Directory structure
- /src -> Nuxt(Client)
- /server -> Express(Server)
- /db -> MySQL(DB)

### install modules
It is assumed that node(v12.x.x), npm and yarn are installed.
The ability to build a development environment is also the subject of this test, so even if an error occurs, please resolve it on your own.

sample

```
$ node -v
v12.18.3
$ npm -v
6.14.6
$ yarn -v
1.22.4
```

### setup project
#### DB
1. cd db && docker-compose build
1. docker-compose up -d

#### Server
1. cd server && npm run ts-node index.ts

#### Client
1. cd src && yarn dev

### How to confirm to success to build environment
1. You access to http://localhost:3000/
1. It's success if render html.


