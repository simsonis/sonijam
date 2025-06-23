---
title: '자주 사용하는 JavaScript 개발 팁 5가지'
description: '일상적인 JavaScript 개발에서 유용한 팁들을 모아봤습니다. 생산성을 높이는 실용적인 기법들을 알아보세요.'
publishDate: '2024-03-22'
author: 'Sonijam'
authorURL: 'https://simsonis.github.io/sonijam'
heroImage: '/sonijam/assets/blog/img2.jpg'
alt: 'JavaScript 개발 팁'
image:
    src: '/sonijam/assets/blog/img2.jpg'
    alt: 'JavaScript 개발 팁'
    width: 1920
    height: 1280
layout: post
tags: ['JavaScript', 'Tips', 'Development', 'Productivity', 'Best Practices']
---

# 자주 사용하는 JavaScript 개발 팁 5가지

JavaScript 개발을 하다 보면 반복적으로 사용하게 되는 패턴들이 있습니다. 오늘은 개발 생산성을 높여주는 유용한 JavaScript 팁들을 소개해드리겠습니다.

## 1. 배열에서 중복 제거하기

### Set을 활용한 방법

```javascript
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
```

### 객체 배열에서 중복 제거

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'Bob' }
];

const uniqueUsers = users.filter((user, index, self) => 
  index === self.findIndex(u => u.id === user.id)
);
```

## 2. 객체 속성 안전하게 접근하기

### Optional Chaining 사용

```javascript
// 기존 방식 (에러 가능성 있음)
const userName = user.profile.name;

// 안전한 방식
const userName = user?.profile?.name ?? 'Unknown';

// 배열에서도 사용 가능
const firstComment = post?.comments?.[0]?.text;
```

### Nullish Coalescing으로 기본값 설정

```javascript
// falsy 값들을 구분해서 처리
const config = {
  timeout: 0,
  retries: null,
  debug: false
};

const timeout = config.timeout ?? 5000;  // 0 (falsy지만 유효한 값)
const retries = config.retries ?? 3;     // 3 (null이므로 기본값 사용)
const debug = config.debug ?? true;      // false (falsy지만 유효한 값)
```

## 3. 배열 조작 고급 기법

### flatMap으로 매핑과 평탄화 동시에

```javascript
const sentences = ['Hello world', 'How are you', 'Good morning'];

// 각 문장을 단어로 분리하고 하나의 배열로 합치기
const words = sentences.flatMap(sentence => sentence.split(' '));
console.log(words); 
// ['Hello', 'world', 'How', 'are', 'you', 'Good', 'morning']
```

### reduce로 객체 변환

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'Tablet', price: 300 }
];

// 배열을 객체로 변환 (id를 키로 사용)
const productMap = products.reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {});

// 카테고리별 그룹화
const productsByPrice = products.reduce((acc, product) => {
  const priceRange = product.price >= 500 ? 'expensive' : 'affordable';
  if (!acc[priceRange]) acc[priceRange] = [];
  acc[priceRange].push(product);
  return acc;
}, {});
```

## 4. 비동기 처리 패턴

### Promise.allSettled로 모든 결과 받기

```javascript
const urls = [
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data'
];

// 일부 실패해도 모든 결과를 받고 싶을 때
const results = await Promise.allSettled(
  urls.map(url => fetch(url))
);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`API ${index + 1} 성공:`, result.value);
  } else {
    console.error(`API ${index + 1} 실패:`, result.reason);
  }
});
```

### async/await에서 에러 처리

```javascript
// 에러 처리를 위한 헬퍼 함수
const safeAsync = async (asyncFn) => {
  try {
    const result = await asyncFn();
    return [null, result];
  } catch (error) {
    return [error, null];
  }
};

// 사용 예시
const [error, data] = await safeAsync(() => fetchUserData(userId));

if (error) {
  console.error('사용자 데이터 로딩 실패:', error);
  return;
}

console.log('사용자 데이터:', data);
```

## 5. 성능 최적화 기법

### 디바운싱과 쓰로틀링

```javascript
// 디바운싱: 마지막 호출 후 일정 시간이 지나야 실행
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 검색 입력 최적화
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('검색 실행:', query);
  // API 호출 로직
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// 쓰로틀링: 일정 간격으로만 실행
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 스크롤 이벤트 최적화
const throttledScroll = throttle(() => {
  console.log('스크롤 위치:', window.scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### 메모이제이션으로 중복 계산 방지

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function (...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 비싼 계산 함수
const expensiveCalculation = memoize((n) => {
  console.log('계산 실행:', n);
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += i;
  }
  return result;
});

console.log(expensiveCalculation(1000)); // 계산 실행
console.log(expensiveCalculation(1000)); // 캐시에서 반환
```

## 보너스: 유용한 원라이너들

```javascript
// 랜덤 배열 섞기
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

// 배열에서 랜덤 요소 선택
const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];

// 객체에서 특정 키들만 선택
const pick = (obj, keys) => 
  keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

// 깊은 복사
const deepClone = obj => JSON.parse(JSON.stringify(obj));

// 배열 청크 나누기
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
```

## 마무리

이런 작은 팁들이 모여서 개발 생산성을 크게 향상시킬 수 있습니다. 특히 최신 JavaScript 기능들을 적극 활용하면 더 간결하고 읽기 쉬운 코드를 작성할 수 있습니다.

여러분만의 유용한 JavaScript 팁이 있다면 댓글로 공유해주세요! 다음 포스트에서는 더 고급 JavaScript 패턴들을 다뤄보겠습니다.

## 참고 자료

- [MDN JavaScript 가이드](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://ko.javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) 