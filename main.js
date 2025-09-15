document.addEventListener('touchend', (e) => {
    // 獲取所有結束的觸控點
    const touches = e.changedTouches;
    const messageElement = document.getElementById('message');

    // 檢查觸控點數量
    if (touches.length !== 4) {
        console.log("觸控點數量不正確，需要4個。");
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

    // 根據X座標排序，方便後續計算
    points.sort((a, b) => a.x - b.x);

    // 判斷四個點是否構成一個正方形
    const tolerance = 0.05; // 容許的誤差值
    const isSquare = validateSquare(points, tolerance);

    if (isSquare) {
        messageElement.textContent = "驗證成功！";
        messageElement.style.color = "green";
        console.log("✅ 驗證成功！");
    } else {
        messageElement.textContent = "請重新嘗試，圖案不正確。";
        messageElement.style.color = "red";
        console.log("❌ 驗證失敗，圖案不正確。");
    }
});

/**
 * 驗證四個點是否構成一個正方形
 * @param {Array<Object>} points - 正規化後的四個觸控點
 * @param {number} tolerance - 容許的誤差值
 * @returns {boolean} - 是否為正方形
 */
function validateSquare(points, tolerance) {
    // 計算兩點間的距離
    const distance = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

    // 計算四條邊的長度
    const d12 = distance(points[0], points[1]);
    const d23 = distance(points[1], points[2]);
    const d34 = distance(points[2], points[3]);
    const d41 = distance(points[3], points[0]);

    // 檢查四邊是否大致相等
    const sidesEqual = (
        Math.abs(d12 - d23) < tolerance &&
        Math.abs(d23 - d34) < tolerance &&
        Math.abs(d34 - d41) < tolerance
    );

    // 檢查對角線是否大致相等
    const diag1 = distance(points[0], points[2]);
    const diag2 = distance(points[1], points[3]);
    const diagonalsEqual = Math.abs(diag1 - diag2) < tolerance;

    return sidesEqual && diagonalsEqual;
}