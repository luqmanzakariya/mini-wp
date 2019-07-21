# mini-wp
## My App Name
Mini Wordpress build with Express, Vue and Mongoose

## List of basic routes:

| Route  | HTTP | Headers(s) | Body | Description         |
| ------ | ---- | ---------- | ---- | ------------------- |
| http://localhost:3000/users/register   | POST  | None       | register | register manually (input from body)
| http://localhost:3000/users/login   | POST  | none       | login | login manually (input from body)
| http://localhost:3000/users/login/google | POST  | token  | None       | None | register/login using google
| http://localhost:3000/articles/create   | POST  | token       | None | Create article 
| http://localhost:3000/articles/allUserArticle   | GET  | token       | None | Get all user registered article
| http://localhost:3000/articles/findAll   | GET  | token       | todo | Find all article created by user
| http://localhost:3000/articles/:id   | DELETE  | token       | None | Delete user created article
| http://localhost:3000/articles/:id   | PATCH  | token       | None | Edit user created article
| http://localhost:3000/weathers/:id   | GET  | token       | None | Find one user specific article