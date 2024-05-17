Auth 

<h1 style='background-color: rgba(55, 55, 55, 0.4); text-align: center'>API 명세서 </h1>

해당 API 명세서는 '헤어케어 디자이너 매칭 플랫폼 서비스'의 REST API를 명세하고 있습니다.

- Domain : <http://localhost:4200>  

***

<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>Auth 모듈</h2>

인증 및 인가와 관련된 REST API 모듈  
로그인, 회원가입, 소셜 로그인, 소셜 회원가입 등의 API가 포함되어 있습니다.  

- url : /api/v1/auth



#### - 이메일 인증  

- method : **POST**     
- URL : **/email_auth**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/email-auth" \
 -d "userEmail=email@email.com"
```



#### - 이메일 인증 확인

- method : **POST**  
- URL : **/email_auth_check**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/email-auth-check" \
 -d "userEmail=email@email.com" \
 -d "authNumber=0123"
```

***

#### - 회원가입

- method : **POST**  
- URL : **/sign_up**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/sign_up" \
 -d "userId=service123" \
 -d "userPassword=Pa55w0rd" \
 -d "userEmail=email@email.com" \
 -d "authNumber=0123"  \
 -d "userAge":"20" \
 -d "userGender":"male"
```

***

#### - 로그인  

- method : **POST**  
- URL : **/sign_in**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/sign-in" \
 -d "userId=service123" \
 -d "userPassword=P!ssw0rd"
```

***

#### - 아이디 찾기

- method : **POST**  
- URL : **/id_found**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/id_found" \
 -d "userEmail=email@email.com" \
 -d "authNumber=0123"
```

***

#### - 아이디 찾기 확인

- method : **GET**  
- URL : **/id_found_value**

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/id_found_value" \
 -d "userId=service123" \
```

***

#### - 비밀번호 찾기

- method : **POST**  
- URL : **/password_found**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/password_found" \
 -d "userId=service123" \
 -d "userEmail=email@email.com" \
 -d "authNumber=0123"
```

***

#### - 비밀번호 찾기 재설정

- method : **POST**  
- URL : **/password_change**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/password_change" \
 -d '{"userPassword":"qwe123"}' \

```

***

#### - 로그아웃

- method : **POST**  
- URL : **/logout**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/logout" \
 -H "Authorization: Bearer {JWT}"
```


#### - 내 정보

- method : **GET**  
- URL : **/my_page**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/my_page" \
 -H "Authorization: Bearer {JWT}" \
```

***

#### - 개인정보수정

- method : **POST**  
- URL : **/update**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/update" \
 -H "Authorization: Bearer {JWT}" \
 -d "userId=service123" \
 -d "userPassword=Pa55w0rd" \
 -d "userEmail=email@email.com" \
 -d "authNumber=0123" \
 -d "userAge":"20" \
 -d "userGender":"male"
```

***

#### - 회원탈퇴

- method : **POST**  
- URL : **/user_delete**  

```bash
curl -v -X POST "http://localhost:4200/api/v1/auth/user_delete" \
 -H "Authorization: Bearer {JWT}" \
```

***