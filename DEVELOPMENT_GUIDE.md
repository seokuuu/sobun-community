# 소분모임 커뮤니티 앱 개발 가이드

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [프로젝트 구조](#프로젝트-구조)
4. [개발 환경 설정](#개발-환경-설정)
5. [API 문서](#api-문서)
6. [데이터베이스 스키마](#데이터베이스-스키마)
7. [실행 방법](#실행-방법)
8. [개발 워크플로우](#개발-워크플로우)

## 🎯 프로젝트 개요

**소분모임 커뮤니티**는 코스트코, 트레이더스 등 대량 구매 상품을 소분할 수 있는 모임 커뮤니티 앱입니다.

### 주요 기능
- 사용자 인증 (회원가입, 로그인)
- 소분모임 생성 및 참여
- 상품 관리 및 주문 시스템
- 결제 및 정산 기능
- 후기 및 신뢰도 시스템

## 🛠 기술 스택

### 백엔드
- **프레임워크**: NestJS
- **데이터베이스**: PostgreSQL
- **ORM**: Prisma
- **인증**: JWT (JSON Web Token)
- **언어**: TypeScript

### 프론트엔드
- **프레임워크**: React Native (Expo)
- **네비게이션**: React Navigation
- **언어**: TypeScript

### 공통
- **패키지 관리**: npm
- **모노레포 구조**: npm workspaces
- **타입 공유**: @sobun/shared 패키지

## 📁 프로젝트 구조

```
sobun-community/
├── backend/                 # NestJS 백엔드 API
│   ├── src/
│   │   ├── auth/           # 인증 모듈
│   │   ├── users/          # 사용자 모듈
│   │   ├── groups/         # 그룹 모듈
│   │   ├── common/         # 공통 서비스 (Prisma)
│   │   ├── app.module.ts   # 메인 앱 모듈
│   │   └── main.ts         # 서버 진입점
│   ├── prisma/
│   │   └── schema.prisma   # 데이터베이스 스키마
│   ├── .env               # 환경변수
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React Native 프론트엔드
│   ├── src/
│   │   ├── screens/        # 화면 컴포넌트
│   │   ├── services/       # API 서비스
│   │   └── types/          # 타입 정의
│   ├── App.tsx             # 메인 앱 컴포넌트
│   ├── app.json           # Expo 설정
│   └── package.json
├── shared/                 # 공통 타입 패키지
│   ├── src/
│   │   └── index.ts        # 공통 타입 내보내기
│   └── package.json
├── package.json            # 루트 워크스페이스 설정
└── README.md
```

## ⚙️ 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/seokuuu/sobun-community.git
cd sobun-community
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`backend/.env` 파일에 다음 내용 추가:
```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
NODE_ENV="development"
PORT=3000
```

### 4. 데이터베이스 설정
```bash
# 백엔드 디렉토리로 이동
cd backend

# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev
```

## 🔌 API 문서

### 인증 API

#### 로그인
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
      "id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "trustScore": 0
    },
    "accessToken": "jwt_token"
  },
  "message": "로그인이 완료되었습니다.",
  "success": true
}
```

#### 회원가입
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

### 그룹 API

#### 그룹 목록 조회
```http
GET /api/groups
```

#### 그룹 생성
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

#### 그룹 가입
```http
POST /api/groups/{groupId}/join
Authorization: Bearer {jwt_token}
```

#### 그룹 탈퇴
```http
DELETE /api/groups/{groupId}/leave
Authorization: Bearer {jwt_token}
```

## 🗄️ 데이터베이스 스키마

### User (사용자)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  password  String
  fullName  String?
  phone     String?
  avatar    String?
  address   String?
  trustScore Int     @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  groups    GroupMember[]
  orders    Order[]
  reviews   Review[]
  createdGroups Group[]
}
```

### Group (그룹)
```prisma
model Group {
  id          String   @id @default(cuid())
  title       String
  description String?
  store       String
  location    String
  pickupLocation String
  pickupTime  DateTime
  deadline    DateTime
  minMembers  Int      @default(2)
  maxMembers  Int      @default(10)
  status      GroupStatus @default(RECRUITING)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  creatorId   String
  creator     User     @relation(fields: [creatorId], references: [id])
  members     GroupMember[]
  products    Product[]
  orders      Order[]
}
```

### GroupMember (그룹 멤버)
```prisma
model GroupMember {
  id       String @id @default(cuid())
  userId   String
  groupId  String
  joinedAt DateTime @default(now())
  
  user     User   @relation(fields: [userId], references: [id])
  group    Group  @relation(fields: [groupId], references: [id])
  
  @@unique([userId, groupId])
}
```

### Enums
```prisma
enum GroupStatus {
  RECRUITING  // 모집 중
  ACTIVE      // 진행 중
  COMPLETED   // 완료
  CANCELLED   // 취소됨
}

enum OrderStatus {
  PENDING     // 대기 중
  CONFIRMED   // 확정됨
  PAID        // 결제됨
  COMPLETED   // 완료됨
  CANCELLED   // 취소됨
}

enum PaymentStatus {
  PENDING     // 대기 중
  COMPLETED   // 완료됨
  FAILED      // 실패
  REFUNDED    // 환불됨
}
```

## 🚀 실행 방법

### 백엔드 실행
```bash
# 루트 디렉토리에서
npm run dev:backend

# 또는 백엔드 디렉토리에서
cd backend
npm run start:dev
```

### 프론트엔드 실행
```bash
# 루트 디렉토리에서
npm run dev:frontend

# 또는 프론트엔드 디렉토리에서
cd frontend
npm start
```

### 동시 실행
```bash
# 백엔드와 프론트엔드 동시 실행
npm run dev:both
```

### 데이터베이스 관리
```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npm run db:studio

# 마이그레이션 실행
npm run db:migrate
```

## 🔄 개발 워크플로우

### 1. 기능 개발 순서
1. **백엔드 API 개발**
   - Prisma 스키마 수정
   - 서비스 로직 구현
   - 컨트롤러 생성
   - 모듈 등록

2. **프론트엔드 화면 개발**
   - 화면 컴포넌트 생성
   - API 서비스 연동
   - 네비게이션 추가

3. **타입 공유**
   - `shared/src/index.ts`에 공통 타입 추가
   - 백엔드와 프론트엔드에서 동일한 타입 사용

### 2. 코드 스타일
- **TypeScript** 사용
- **ESLint** 및 **Prettier** 적용
- **함수형 컴포넌트** 사용 (React)
- **async/await** 사용 (Promise)

### 3. 커밋 메시지 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가
chore: 빌드 관련 수정
```

### 4. 브랜치 전략
- `main`: 배포 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `fix/*`: 버그 수정 브랜치

## 📝 추가 구현할 기능

### 1. 상품 관리
- 상품 등록/수정/삭제
- 상품 카테고리 관리
- 상품 이미지 업로드

### 2. 주문 시스템
- 장바구니 기능
- 주문 생성/관리
- 주문 상태 변경

### 3. 결제 시스템
- 토스페이먼츠 연동
- 에스크로 결제
- 정산 기능

### 4. 알림 시스템
- 푸시 알림
- 이메일 알림
- 앱 내 알림

### 5. 사용자 기능
- 프로필 관리
- 신뢰도 시스템
- 후기 시스템

## 🔧 트러블슈팅

### 1. 데이터베이스 연결 오류
```bash
# Prisma 클라이언트 재생성
npx prisma generate

# 데이터베이스 연결 확인
npx prisma db push
```

### 2. 프론트엔드 실행 오류
```bash
# 캐시 삭제
expo start --clear

# 의존성 재설치
rm -rf node_modules
npm install
```

### 3. 타입 오류
```bash
# 공유 패키지 재빌드
cd shared
npm run build

# 타입 확인
npx tsc --noEmit
```

## 📞 지원

문제가 발생하거나 질문이 있으시면 다음을 확인해주세요:

1. 이 문서의 트러블슈팅 섹션
2. GitHub Issues
3. Prisma 공식 문서
4. NestJS 공식 문서
5. React Native 공식 문서

---

**Happy Coding! 🚀**