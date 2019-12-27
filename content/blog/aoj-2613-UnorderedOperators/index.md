+++
author = "mkan0141"
categories = ["競プロ", "AOJ"]
date = "2018-09-20"
description = ""
images = [""]
linktitle = "AOJ2613 Unordered Operators"
title = "AOJ2613 Unordered Operators"
type = "post"

+++


※構文解析パートは[構文解析Howto](https://gist.github.com/draftcode/1357281)を見て書いています．

## 問題
'+' , '-', '*'の3つの演算子を使った式が与えられる．
それぞれの演算子の優先順位を変えて得られる値の最大値を求めろ．

## 解法(もとい実装方法)

[notさんの解法記事](http://noy.hatenablog.jp/entry/2017/05/22/121607#Unordered-Operators--Aizu-Online-Judge)にも書かれているが，優先順位が全て同じ時は以下のコードになる．

```cpp
int expression(State &begin) {
  int ret = term(begin);
  while (1) {
    if (*begin == '+') {
      begin++;
      ret += term(begin);
    } else if (*begin == '-') {
      begin++;
      ret -= term(begin);
    } else if (*begin == '*') {
      begin++;
      ret *= term(begin);
    } else {
      break;
    }
  }
  return ret;
}
```
このコードを3つ複製して，それぞれに優先順位をつけるような条件式を付け加えれば，優先順位が3つあるコードが出来上がる．

次に優先順位の実装を考える．
今回は3bitの数字3つ(priority[3])で管理する．3bitの数字は，1bit目が立っていれば'+'，2bit目が立っていれば'-'，3bit目が立っていれば'*'を使うことを表し，3つの数字はそれぞれの優先順位を表す．例えば以下のようになる．
```cpp
priority[0] = (001) // 三番目に優先順位が高いのは '+'
priority[1] = (100) // 二番目に優先順位が高いのは '*'
priority[2] = (010) // 最も優先順位が高いのは '-'
```

上記のコードにこの優先順位を適応させたコードは以下のようになる．

```cpp
/* 一番目に優先順位が高いやつ */
int expression3(State &begin) {
  int ret = factor(begin);
  while (1) {
    if (*begin == '+' && priority[2] & (1 << 0)) {
      begin++;
      ret += factor(begin);
    } else if (*begin == '-' && priority[2] & (1 << 1)) {
      begin++;
      ret -= factor(begin);
    } else if (*begin == '*' && priority[2] & (1 << 2)) {
      begin++;
      ret *= factor(begin);
    } else {
      break;
    }
  }
  return ret;
}

/* 二番目に優先順位が高いやつ */
int expression2(State &begin) {
  int ret = expression3(begin);
  while (1) {
    if (*begin == '+' && priority[1] & (1 << 0)) {
      begin++;
      ret += expression3(begin);
    } else if (*begin == '-' && priority[1] & (1 << 1)) {
      begin++;
      ret -= expression3(begin);
    } else if (*begin == '*' && priority[1] & (1 << 2)) {
      begin++;
      ret *= expression3(begin);
    } else {
      break;
    }
  }
  return ret;
}

/* 三番目に優先順位が高いやつ */
int expression1(State &begin) {
  int ret = expression2(begin);
  while (1) {
    if (*begin == '+' && priority[0] & (1 << 0)) {
      begin++;
      ret += expression2(begin);
    } else if (*begin == '-' && priority[0] & (1 << 1)) {
      begin++;
      ret -= expression2(begin);
    } else if (*begin == '*' && priority[0] & (1 << 2)) {
      begin++;
      ret *= expression2(begin);
    } else {
      break;
    }
  }
  return ret;
}

```

これを使って，優先順位を全通り試せば答えが出る．

## ソースコード

```cpp

#define int long long

typedef string::const_iterator State;

int number(State &begin);
int factor(State &begin);
int expression1(State &begin);
int expression2(State &begin);
int expression3(State &begin);

/* 優先順位を格納する配列 */
vector<int> priority(3);

int number(State &begin) {
  int ret = 0;
  while (isdigit(*begin)) {
    ret *= 10;
    ret += (*begin) - '0';
    begin++;
  }
  return ret;
}

int factor(State &begin) {
  int ret;
  if (*begin == '(') {
    begin++;
    ret = expression1(begin);
    begin++;
  } else {
    ret = number(begin);
  }
  return ret;
}

/* 一番目に優先順位が高いやつ */
int expression3(State &begin) {
  int ret = factor(begin);
  while (1) {
    if (*begin == '+' && priority[2] & (1 << 0)) {
      begin++;
      ret += factor(begin);
    } else if (*begin == '-' && priority[2] & (1 << 1)) {
      begin++;
      ret -= factor(begin);
    } else if (*begin == '*' && priority[2] & (1 << 2)) {
      begin++;
      ret *= factor(begin);
    } else {
      break;
    }
  }
  return ret;
}

/* 二番目に優先順位が高いやつ */
int expression2(State &begin) {
  int ret = expression3(begin);
  while (1) {
    if (*begin == '+' && priority[1] & (1 << 0)) {
      begin++;
      ret += expression3(begin);
    } else if (*begin == '-' && priority[1] & (1 << 1)) {
      begin++;
      ret -= expression3(begin);
    } else if (*begin == '*' && priority[1] & (1 << 2)) {
      begin++;
      ret *= expression3(begin);
    } else {
      break;
    }
  }
  return ret;
}

/* 三番目に優先順位が高いやつ */
int expression1(State &begin) {
  int ret = expression2(begin);
  while (1) {
    if (*begin == '+' && priority[0] & (1 << 0)) {
      begin++;
      ret += expression2(begin);
    } else if (*begin == '-' && priority[0] & (1 << 1)) {
      begin++;
      ret -= expression2(begin);
    } else if (*begin == '*' && priority[0] & (1 << 2)) {
      begin++;
      ret *= expression2(begin);
    } else {
      break;
    }
  }
  return ret;
}

signed main() {
  string s;
  cin >> s;
  int ans = LLONG_MIN;
  for (int i = 0; i < (1 << 3); i++) {
    for (int j = 0; j < (1 << 3); j++) {
      for (int k = 0; k < (1 << 3); k++) {
        /* 各bitが1つずつ立っていればいいので */
        if ((__builtin_popcount(i) + __builtin_popcount(j) + __builtin_popcount(k)) != 3 || (i | j | k) != 7)
          continue;
        priority[0] = i;
        priority[1] = j;
        priority[2] = k;
        State begin = s.begin();
        ans = max(ans, expression1(begin));
      }
    }
  }
  cout << ans << endl;
  return 0;
}


```
