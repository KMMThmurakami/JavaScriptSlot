'use strict'

{
  // パネル
  class Panel {
    // コンストラクタ
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = this.getRandomImg();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          spin.classList.remove('inactive');
          panelsLeft = panels.length;
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    // ランダムに画像を取得する
    getRandomImg() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    // パネルの回転
    spin() {
      this.img.src = this.getRandomImg();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    // 不一致判定
    isUnmatched(p1, p2) {
      return (
              (this.img.src !== p1.img.src) 
              &&
              (this.img.src !== p2.img.src)
             );
    }

    // CSS：unmatchedクラス付与（画像をグレーアウト）
    unmatched() {
      this.img.classList.add('unmatched');
    }

    // CSS：画像アクティベート
    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  // スロット結果判定
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatched();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatched();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatched();
    }
  }

  // 文字かえ
  function textChange() {
    const display = document.getElementById('sub');
    const text = document.createElement('div');
    text.textContent = 'SLOT';

    display.insertAdjacentElement('afterbegin', text);
  }
  
  // パネルインスタンス作成
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  // 動作中パネル数初期化
  let panelsLeft = panels.length;

  // 回転ロジック
  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  })
}