let stampCount = 0;

document.addEventListener('touchend', (e) => {
    const touches = e.changedTouches;
    const messageElement = document.getElementById('message');
    const counterElement = document.getElementById('counter');
    const distanceDisplay = document.getElementById('distance-display');

    // 每次觸摸結束，蓋印次數加一
    stampCount++;
    counterElement.textContent = `蓋印次數: ${stampCount}`;
    console.log(`--- 第 ${stampCount} 次蓋印 ---`);
    console.log(`偵測到的觸控點數量: ${touches.length}`);

    // 檢查觸控點數量
    if (touches.length !== 3) {
        messageElement.textContent = `請用三根手指輕觸螢幕。`;
        messageElement.style.color = "red";
        distanceDisplay.textContent = "當前數值: 無法計算";
        console.log(`❌ 驗證失敗：觸控點數量不對，需要3個。`);
        return;
    }

    // 將像素座標正規化為0到1之間的相對值
    const points = [];
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        points.push({
            x: touch.clientX / window.innerWidth,
            y: touch.clientY / window.innerHeight
        });
    }

    // 計算三點間的距離
    const distance = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

    const d1 = distance(points[0], points[1]);
    const d2 = distance(points[1], points[2]);
    const d3 = distance(points[2], points[0]);
    
    // 計算三角形的周長作為驗證基準
    const perimeter = d1 + d2 + d3;
    distanceDisplay.textContent = `當前數值 (周長): ${perimeter.toFixed(3)}`;

    // 定義一個合理的周長範圍
    const minPerimeter = 0.2; 
    const maxPerimeter = 1.0; 

    // 驗證周長是否在範圍內
    if (perimeter >= minPerimeter && perimeter <= maxPerimeter) {
        messageElement.textContent = "驗證成功！";
        messageElement.style.color = "green";
        console.log("✅ 驗證成功！");
    } else {
        messageElement.textContent = "請調整三指間的距離，重新嘗試。";
        messageElement.style.color = "red";
        console.log("❌ 驗證失敗：三角形周長不符。");
    }
});
