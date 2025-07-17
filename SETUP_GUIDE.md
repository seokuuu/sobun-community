# 소분모임 커뮤니티 앱 설치 가이드

## 📋 목차
1. [시스템 요구사항](#시스템-요구사항)
2. [사전 설치 프로그램](#사전-설치-프로그램)
3. [프로젝트 설정](#프로젝트-설정)
4. [데이터베이스 설정](#데이터베이스-설정)
5. [환경변수 설정](#환경변수-설정)
6. [애플리케이션 실행](#애플리케이션-실행)
7. [개발 도구 설정](#개발-도구-설정)
8. [문제 해결](#문제-해결)

## 💻 시스템 요구사항

### 운영체제
- macOS 10.14 이상
- Windows 10 이상
- Ubuntu 18.04 이상

### 하드웨어
- RAM: 8GB 이상 권장
- 저장공간: 5GB 이상
- 인터넷 연결 필요

## 🔧 사전 설치 프로그램

### 1. Node.js 설치
Node.js 18.0.0 이상이 필요합니다.

#### macOS (Homebrew 사용)
```bash
brew install node
```

#### Windows
[Node.js 공식 웹사이트](https://nodejs.org)에서 LTS 버전 다운로드

#### Ubuntu
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 설치 확인
```bash
node --version
npm --version
```

### 2. Git 설치
#### macOS
```bash
brew install git
```

#### Windows
[Git 공식 웹사이트](https://git-scm.com)에서 다운로드

#### Ubuntu
```bash
sudo apt-get install git
```

### 3. Expo CLI 설치 (선택사항)
```bash
npm install -g expo-cli
```

### 4. 모바일 개발 환경 (선택사항)
#### iOS 개발 (macOS만)
- Xcode 12 이상
- iOS Simulator

#### Android 개발
- Android Studio
- Android SDK
- Android Emulator

## 📁 프로젝트 설정

### 1. 저장소 클론
```bash
git clone https://github.com/seokuuu/sobun-community.git
cd sobun-community
```

### 2. 의존성 설치
```bash
# 루트 디렉토리에서 전체 의존성 설치
npm install

# 개별 설치 (필요한 경우)
cd backend && npm install
cd ../frontend && npm install
cd ../shared && npm install
```

### 3. 프로젝트 구조 확인
```bash
# 프로젝트 구조 확인
ls -la
```

예상 결과:
```
sobun-community/
├── backend/         # NestJS 백엔드
├── frontend/        # React Native 프론트엔드
├── shared/          # 공통 타입 패키지
├── package.json     # 루트 워크스페이스
└── README.md
```

## 🗄️ 데이터베이스 설정

### 1. PostgreSQL 설치

#### macOS (Homebrew)
```bash
brew install postgresql
brew services start postgresql
```

#### Windows
[PostgreSQL 공식 웹사이트](https://www.postgresql.org/download/windows/)에서 다운로드

#### Ubuntu
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. 데이터베이스 생성
```bash
# PostgreSQL 사용자로 로그인
sudo -u postgres psql

# 데이터베이스 생성
CREATE DATABASE sobun_community;

# 사용자 생성 (선택사항)
CREATE USER sobun_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sobun_community TO sobun_user;

# 종료
\q
```

### 3. Prisma 설정
```bash
# 백엔드 디렉토리로 이동
cd backend

# Prisma 초기화 (이미 완료된 경우 생략)
npx prisma init

# 데이터베이스 마이그레이션
npx prisma migrate dev

# Prisma 클라이언트 생성
npx prisma generate
```

### 4. 데이터베이스 연결 확인
```bash
# Prisma Studio 실행 (선택사항)
npx prisma studio
```

## 🔑 환경변수 설정

### 1. 백엔드 환경변수
`backend/.env` 파일 생성:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sobun_community?schema=public"

# JWT Secret (임의의 긴 문자열)
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"

# App Configuration
NODE_ENV="development"
PORT=3000
```

### 2. 환경변수 값 설정 가이드

#### DATABASE_URL
- 형식: `postgresql://username:password@host:port/database`
- 예시: `postgresql://sobun_user:mypassword@localhost:5432/sobun_community`

#### JWT_SECRET
- 최소 32자 이상의 랜덤 문자열
- 생성 예시:
```bash
# macOS/Linux
openssl rand -base64 32

# 또는 온라인 생성기 사용
```

### 3. 프론트엔드 환경변수 (선택사항)
`frontend/.env` 파일 생성:
```env
# API Base URL
API_BASE_URL=http://localhost:3000/api

# Expo 설정
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## 🚀 애플리케이션 실행

### 1. 백엔드 실행
```bash
# 방법 1: 루트 디렉토리에서
npm run dev:backend

# 방법 2: 백엔드 디렉토리에서
cd backend
npm run start:dev
```

성공 시 콘솔 출력:
```
서버가 3000번 포트에서 실행 중입니다.
```

### 2. 프론트엔드 실행
```bash
# 방법 1: 루트 디렉토리에서
npm run dev:frontend

# 방법 2: 프론트엔드 디렉토리에서
cd frontend
npm start
```

### 3. 동시 실행
```bash
# 백엔드와 프론트엔드 동시 실행
npm run dev:both
```

### 4. 애플리케이션 테스트
#### 백엔드 테스트
```bash
# API 테스트
curl http://localhost:3000/api

# 헬스 체크
curl http://localhost:3000/api/health
```

#### 프론트엔드 테스트
- Expo 앱에서 QR 코드 스캔
- 브라우저에서 `http://localhost:19006` 접속
- iOS 시뮬레이터/Android 에뮬레이터 사용

## 🛠️ 개발 도구 설정

### 1. VS Code 추천 확장
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-json",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-prisma"
  ]
}
```

### 2. 코드 포맷팅 설정
`.vscode/settings.json` 파일 생성:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 3. 디버깅 설정
`.vscode/launch.json` 파일 생성:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/src/main.ts",
      "outFiles": ["${workspaceFolder}/backend/dist/**/*.js"],
      "runtimeArgs": ["-r", "ts-node/register"]
    }
  ]
}
```

### 4. Git 설정
```bash
# 사용자 정보 설정
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 기본 브랜치 설정
git config --global init.defaultBranch main

# 자동 CRLF 변환 설정 (Windows)
git config --global core.autocrlf true

# 자동 CRLF 변환 설정 (macOS/Linux)
git config --global core.autocrlf input
```

## 🔧 문제 해결

### 1. 공통 문제

#### Node.js 버전 문제
```bash
# 현재 Node.js 버전 확인
node --version

# nvm 사용 (Node.js 버전 관리)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

#### 권한 문제 (macOS/Linux)
```bash
# npm 글로벌 패키지 권한 설정
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# 또는 nvm 사용 권장
```

#### 포트 사용 중 오류
```bash
# 포트 사용 중인 프로세스 확인
lsof -i :3000
lsof -i :19000

# 프로세스 종료
kill -9 <PID>
```

### 2. 백엔드 문제

#### 데이터베이스 연결 오류
```bash
# PostgreSQL 서비스 상태 확인
sudo systemctl status postgresql

# 데이터베이스 연결 테스트
psql -h localhost -U username -d sobun_community

# Prisma 연결 테스트
npx prisma db push
```

#### Prisma 문제
```bash
# 캐시 삭제
rm -rf node_modules/.prisma

# 클라이언트 재생성
npx prisma generate

# 마이그레이션 리셋
npx prisma migrate reset
```

### 3. 프론트엔드 문제

#### Expo 실행 오류
```bash
# Expo 캐시 삭제
expo start --clear

# 의존성 재설치
rm -rf node_modules
npm install

# Expo CLI 업데이트
npm install -g expo-cli@latest
```

#### 모바일 연결 문제
```bash
# 네트워크 확인
ipconfig getifaddr en0  # macOS
hostname -I             # Linux

# 방화벽 확인
# Windows: Windows Defender 방화벽 설정
# macOS: 시스템 환경설정 > 보안 및 개인정보 > 방화벽
```

### 4. 개발 도구 문제

#### TypeScript 오류
```bash
# TypeScript 캐시 삭제
rm -rf node_modules/.cache
rm -rf dist

# 타입 검사
npx tsc --noEmit
```

#### ESLint/Prettier 오류
```bash
# ESLint 설정 확인
npx eslint --init

# Prettier 설정 확인
npx prettier --check .
```

### 5. 성능 최적화

#### 빌드 시간 단축
```bash
# 병렬 빌드
npm run build:all

# 증분 빌드
npm run build:incremental
```

#### 메모리 사용량 최적화
```bash
# Node.js 메모리 제한 증가
export NODE_OPTIONS="--max-old-space-size=8192"

# 또는 package.json 스크립트에서
"scripts": {
  "start:dev": "NODE_OPTIONS='--max-old-space-size=8192' nest start --watch"
}
```

## 📞 도움말

### 1. 문서 참조
- [NestJS 공식 문서](https://docs.nestjs.com/)
- [React Native 공식 문서](https://reactnative.dev/)
- [Expo 공식 문서](https://docs.expo.dev/)
- [Prisma 공식 문서](https://www.prisma.io/docs/)

### 2. 커뮤니티 지원
- [NestJS Discord](https://discord.gg/nestjs)
- [React Native Community](https://reactnative.dev/community/overview)
- [Expo Forums](https://forums.expo.dev/)

### 3. 문제 신고
GitHub Issues: [https://github.com/seokuuu/sobun-community/issues](https://github.com/seokuuu/sobun-community/issues)

---

**설치 완료 후 다음 단계:**
1. [개발 가이드](./DEVELOPMENT_GUIDE.md) 읽기
2. [API 레퍼런스](./API_REFERENCE.md) 확인
3. 첫 번째 기능 개발 시작

**Happy Coding! 🚀**