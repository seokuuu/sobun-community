# 소분모임 커뮤니티 API 레퍼런스

## 📋 목차
1. [API 개요](#api-개요)
2. [인증](#인증)
3. [사용자 API](#사용자-api)
4. [그룹 API](#그룹-api)
5. [상품 API](#상품-api)
6. [주문 API](#주문-api)
7. [결제 API](#결제-api)
8. [에러 처리](#에러-처리)

## 🌐 API 개요

### Base URL
```
http://localhost:3000/api
```

### 응답 형식
모든 API 응답은 다음 형식을 따릅니다:
```json
{
  "data": any,
  "message": string,
  "success": boolean
}
```

### 에러 응답
```json
{
  "message": string,
  "statusCode": number,
  "error": string
}
```

## 🔐 인증

### JWT 토큰 사용
인증이 필요한 API는 헤더에 JWT 토큰을 포함해야 합니다:
```
Authorization: Bearer {jwt_token}
```

## 👤 사용자 API

### 회원가입
사용자 계정을 생성합니다.

**요청:**
```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "fullName": "홍길동",
  "phone": "010-1234-5678"
}
```

**응답:**
```json
{
  "data": {
    "id": "cm123abc456",
    "email": "user@example.com",
    "username": "username",
    "fullName": "홍길동",
    "phone": "010-1234-5678",
    "trustScore": 0,
    "createdAt": "2025-01-17T10:30:00Z",
    "updatedAt": "2025-01-17T10:30:00Z"
  },
  "message": "회원가입이 완료되었습니다.",
  "success": true
}
```

### 로그인
사용자 인증을 수행합니다.

**요청:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "data": {
    "user": {
      "id": "cm123abc456",
      "email": "user@example.com",
      "username": "username",
      "fullName": "홍길동",
      "phone": "010-1234-5678",
      "trustScore": 0,
      "createdAt": "2025-01-17T10:30:00Z",
      "updatedAt": "2025-01-17T10:30:00Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "로그인이 완료되었습니다.",
  "success": true
}
```

### 프로필 조회
현재 사용자의 프로필을 조회합니다.

**요청:**
```http
GET /api/users/profile
Authorization: Bearer {jwt_token}
```

**응답:**
```json
{
  "data": {
    "id": "cm123abc456",
    "email": "user@example.com",
    "username": "username",
    "fullName": "홍길동",
    "phone": "010-1234-5678",
    "trustScore": 0,
    "createdAt": "2025-01-17T10:30:00Z",
    "updatedAt": "2025-01-17T10:30:00Z"
  },
  "message": "사용자 정보를 가져왔습니다.",
  "success": true
}
```

## 👥 그룹 API

### 그룹 목록 조회
모든 그룹의 목록을 조회합니다.

**요청:**
```http
GET /api/groups
```

**응답:**
```json
{
  "data": [
    {
      "id": "cm123group1",
      "title": "코스트코 대량구매",
      "description": "생필품 함께 구매해요",
      "store": "코스트코 일산점",
      "location": "경기도 고양시",
      "pickupLocation": "일산역 2번 출구",
      "pickupTime": "2025-01-20T14:00:00Z",
      "deadline": "2025-01-18T23:59:59Z",
      "minMembers": 3,
      "maxMembers": 10,
      "status": "RECRUITING",
      "createdAt": "2025-01-17T10:30:00Z",
      "updatedAt": "2025-01-17T10:30:00Z",
      "creatorId": "cm123abc456",
      "memberCount": 3
    }
  ],
  "message": "그룹 목록을 가져왔습니다.",
  "success": true
}
```

### 그룹 상세 조회
특정 그룹의 상세 정보를 조회합니다.

**요청:**
```http
GET /api/groups/{groupId}
```

**응답:**
```json
{
  "data": {
    "id": "cm123group1",
    "title": "코스트코 대량구매",
    "description": "생필품 함께 구매해요",
    "store": "코스트코 일산점",
    "location": "경기도 고양시",
    "pickupLocation": "일산역 2번 출구",
    "pickupTime": "2025-01-20T14:00:00Z",
    "deadline": "2025-01-18T23:59:59Z",
    "minMembers": 3,
    "maxMembers": 10,
    "status": "RECRUITING",
    "createdAt": "2025-01-17T10:30:00Z",
    "updatedAt": "2025-01-17T10:30:00Z",
    "creatorId": "cm123abc456",
    "memberCount": 3,
    "members": [
      {
        "id": "cm123member1",
        "userId": "cm123abc456",
        "groupId": "cm123group1",
        "joinedAt": "2025-01-17T10:30:00Z",
        "user": {
          "id": "cm123abc456",
          "username": "username",
          "avatar": null
        }
      }
    ]
  },
  "message": "그룹 정보를 가져왔습니다.",
  "success": true
}
```

### 그룹 생성
새로운 그룹을 생성합니다.

**요청:**
```http
POST /api/groups
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "title": "코스트코 대량구매",
  "description": "생필품 함께 구매해요",
  "store": "코스트코 일산점",
  "location": "경기도 고양시",
  "pickupLocation": "일산역 2번 출구",
  "pickupTime": "2025-01-20T14:00:00Z",
  "deadline": "2025-01-18T23:59:59Z",
  "minMembers": 3,
  "maxMembers": 10
}
```

**응답:**
```json
{
  "data": {
    "id": "cm123group1",
    "title": "코스트코 대량구매",
    "description": "생필품 함께 구매해요",
    "store": "코스트코 일산점",
    "location": "경기도 고양시",
    "pickupLocation": "일산역 2번 출구",
    "pickupTime": "2025-01-20T14:00:00Z",
    "deadline": "2025-01-18T23:59:59Z",
    "minMembers": 3,
    "maxMembers": 10,
    "status": "RECRUITING",
    "createdAt": "2025-01-17T10:30:00Z",
    "updatedAt": "2025-01-17T10:30:00Z",
    "creatorId": "cm123abc456",
    "memberCount": 1
  },
  "message": "그룹이 생성되었습니다.",
  "success": true
}
```

### 그룹 가입
특정 그룹에 가입합니다.

**요청:**
```http
POST /api/groups/{groupId}/join
Authorization: Bearer {jwt_token}
```

**응답:**
```json
{
  "data": null,
  "message": "그룹에 가입했습니다.",
  "success": true
}
```

### 그룹 탈퇴
특정 그룹에서 탈퇴합니다.

**요청:**
```http
DELETE /api/groups/{groupId}/leave
Authorization: Bearer {jwt_token}
```

**응답:**
```json
{
  "data": null,
  "message": "그룹에서 탈퇴했습니다.",
  "success": true
}
```

## 🛍️ 상품 API
> 향후 구현 예정

### 상품 목록 조회
```http
GET /api/groups/{groupId}/products
```

### 상품 생성
```http
POST /api/groups/{groupId}/products
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "킵쳐 티슈",
  "description": "부드러운 3겹 티슈",
  "price": 25000,
  "category": "생필품",
  "image": "https://example.com/image.jpg"
}
```

### 상품 수정
```http
PUT /api/products/{productId}
Authorization: Bearer {jwt_token}
```

### 상품 삭제
```http
DELETE /api/products/{productId}
Authorization: Bearer {jwt_token}
```

## 📦 주문 API
> 향후 구현 예정

### 주문 생성
```http
POST /api/orders
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "groupId": "cm123group1",
  "items": [
    {
      "productId": "cm123product1",
      "quantity": 2
    }
  ]
}
```

### 주문 목록 조회
```http
GET /api/orders
Authorization: Bearer {jwt_token}
```

### 주문 상세 조회
```http
GET /api/orders/{orderId}
Authorization: Bearer {jwt_token}
```

### 주문 취소
```http
DELETE /api/orders/{orderId}
Authorization: Bearer {jwt_token}
```

## 💳 결제 API
> 향후 구현 예정

### 결제 생성
```http
POST /api/payments
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "orderId": "cm123order1",
  "paymentMethod": "CARD",
  "amount": 50000
}
```

### 결제 상태 조회
```http
GET /api/payments/{paymentId}
Authorization: Bearer {jwt_token}
```

### 결제 취소
```http
DELETE /api/payments/{paymentId}
Authorization: Bearer {jwt_token}
```

## 📊 통계 API
> 향후 구현 예정

### 사용자 통계
```http
GET /api/users/stats
Authorization: Bearer {jwt_token}
```

### 그룹 통계
```http
GET /api/groups/{groupId}/stats
Authorization: Bearer {jwt_token}
```

## ⚠️ 에러 처리

### 에러 코드
- `400` - Bad Request (잘못된 요청)
- `401` - Unauthorized (인증 실패)
- `403` - Forbidden (권한 없음)
- `404` - Not Found (리소스 없음)
- `409` - Conflict (중복 데이터)
- `500` - Internal Server Error (서버 오류)

### 에러 응답 예시
```json
{
  "message": "이미 존재하는 이메일입니다.",
  "statusCode": 409,
  "error": "Conflict"
}
```

### 일반적인 에러 상황

#### 1. 인증 오류
```json
{
  "message": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "statusCode": 401,
  "error": "Unauthorized"
}
```

#### 2. 권한 오류
```json
{
  "message": "그룹 생성자는 탈퇴할 수 없습니다.",
  "statusCode": 403,
  "error": "Forbidden"
}
```

#### 3. 리소스 없음
```json
{
  "message": "그룹을 찾을 수 없습니다.",
  "statusCode": 404,
  "error": "Not Found"
}
```

#### 4. 중복 데이터
```json
{
  "message": "이미 가입한 그룹입니다.",
  "statusCode": 409,
  "error": "Conflict"
}
```

## 🔍 필터링 및 페이징
> 향후 구현 예정

### 쿼리 파라미터
```http
GET /api/groups?page=1&limit=10&status=RECRUITING&store=코스트코
```

### 응답 형식
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  },
  "message": "success",
  "success": true
}
```

## 🧪 테스트

### Postman 컬렉션
API 테스트를 위한 Postman 컬렉션을 제공합니다.

### 예시 요청
```bash
# 회원가입
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# 로그인
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 그룹 목록 조회
curl -X GET http://localhost:3000/api/groups

# 그룹 생성
curl -X POST http://localhost:3000/api/groups \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"테스트 그룹","store":"코스트코","location":"서울","pickupLocation":"강남역","pickupTime":"2025-01-20T14:00:00Z","deadline":"2025-01-18T23:59:59Z","minMembers":2,"maxMembers":5}'
```

---

**API 문서 버전: 1.0.0**  
**마지막 업데이트: 2025-01-17**