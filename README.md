# 소분모임 커뮤니티 앱

코스트코, 트레이더스 등 대량 구매 상품을 소분할 수 있는 모임 커뮤니티 앱입니다.

## 📁 프로젝트 구조

```
sobun-community/
├── backend/          # NestJS 백엔드 API
│   ├── src/
│   ├── prisma/       # 데이터베이스 스키마
│   └── package.json
├── frontend/         # React Native (Expo) 앱
│   ├── src/
│   ├── app.json
│   └── package.json
└── README.md
```

## 🛠 기술 스택

### 백엔드
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT

### 프론트엔드
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: React Query + Zustand

## 🚀 시작하기

### 백엔드 실행
```bash
cd backend
npm install
npm run start:dev
```

### 프론트엔드 실행
```bash
cd frontend
npm install
npm start
```

## 📋 주요 기능

1. **사용자 관리**
   - 회원가입/로그인
   - 프로필 관리
   - 신뢰도 점수 시스템

2. **모임 관리**
   - 소분모임 생성/참여
   - 상품 정보 관리
   - 수량/가격 관리

3. **결제 시스템**
   - 에스크로 방식 결제
   - 정산 기능

4. **위치 기반 서비스**
   - 픽업 장소 설정
   - 근처 모임 찾기

5. **커뮤니케이션**
   - 채팅 시스템
   - 알림 기능
   - 후기 시스템

## 📊 데이터베이스 스키마

주요 테이블:
- `users` - 사용자 정보
- `groups` - 소분모임 정보
- `products` - 상품 정보
- `orders` - 주문 정보
- `payments` - 결제 정보
- `reviews` - 후기 정보