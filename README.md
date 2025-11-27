# 올페이즈 프론트엔드 과제 전형 – 이재호

## 📌 개요
- 메인 대시보드 화면 구현
- 거래 내역 조회 및 가맹점 목록 조회 페이지 구현
- 제공된 API를 활용한 데이터 시각화 및 UI 구성

## ⚙️ 실행 방법

### 1️⃣ 패키지 설치
```bash
npm install
```

### 2️⃣ 로컬 실행
```bash
npm run dev
```

### 3️⃣ 접속 URL
```bash
http://localhost:3000
```

### 🔐 환경 변수
```bash
NEXT_PUBLIC_API_URL="https://recruit.paysbypays.com"
```

## 🛠 기술 스택
- Next.js (16.0.3)
- React (19.2.0)
- TypeScript (5)
- React Query (5.90.10)
- Tailwind CSS (3.4.18)

## ✨ 구현 기능 요약

### 📊 메인 대시보드
- 전체 / 최근 7일 / 오늘 거래액 그래프 시각화
- 총 거래액 / 취소·실패 거래액 / 순 거래액 요약
- 가맹점별 거래 횟수 순위 표시
- 최근 거래내역(5건) 확인 + 상세 페이지 이동 링크 제공
- 결제 수단 비율 및 결제 성공 비율 차트
- 가맹점 검색 기능

### 📋 거래 내역 조회 / 가맹점 목록 조회 페이지
- 테이블 기반 데이터 리스트
- 페이지네이션을 통한 효율적인 데이터 탐색
- 정렬 및 검색 기능 제공

## 🎨 디자인 및 UI/UX 의도
- 대시보드 특성상 복잡하지 않도록 직관적이고 깔끔한 디자인
- 그래프(선형/원형차트)를 활용해 한눈에 데이터 파악 가능
- 테이블 및 검색/정렬 기능으로 데이터 가독성 및 탐색 향상

## 📁 프로젝트 구조
```bash
src
 ├─ app
 │   ├─ (routes)
 │   │   ├─ paymentsList
 │   │   └─ merchantsList
 │   └─ page.tsx
 ├─ components
 ├─ hooks
 ├─ types
 ├─ constants
 ├─ styles
 └─ data
```
