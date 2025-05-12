import React, { useState, useEffect } from "react";

const RankingApp = () => {
  const [nickname, setNickname] = useState("");
  const [duration, setDuration] = useState("");
  const [ranking, setRanking] = useState([]);

  // ✅ mm:ss 형식으로 변환하는 함수
  const formatDuration = (seconds) => {
    if (seconds === undefined || isNaN(seconds)) return "N/A";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ✅ 데이터 불러오기
  useEffect(() => {
    const savedRanking = localStorage.getItem("rankingData");
    if (savedRanking) {
      const parsed = JSON.parse(savedRanking);
      const recalculated = parsed
        .sort((a, b) => a.duration - b.duration)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));
      setRanking(recalculated);
    }
  }, []);

  // ✅ 저장
  useEffect(() => {
    localStorage.setItem("rankingData", JSON.stringify(ranking));
  }, [ranking]);

  // ✅ 랭킹 추가
  const handleAddEntry = () => {
    if (!nickname || !duration || isNaN(duration)) return;

    const newEntry = {
      id: Date.now(),
      nickname,
      duration: parseFloat(duration),
    };

    const updatedRanking = [...ranking, newEntry]
      .sort((a, b) => a.duration - b.duration)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));

    setRanking(updatedRanking);
    setNickname("");
    setDuration("");
  };

  return (
    <div style={{
      backgroundImage: 'url("/background.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      padding: "5vh 5vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "sans-serif",
      color: "white"
    }}>
      <h1 style={{
        marginTop: "20vh",
        fontSize: "3rem",
        marginBottom: "3vh",
        textAlign: "center"
      }}>
        실시간 랭킹 
      </h1>

      {/* 입력 */}
      <div style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "1rem 2rem",
        borderRadius: "1rem",
        marginBottom: "4vh",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        width: "90vw",
        maxWidth: "1200px"
      }}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "1rem",
            fontSize: "1.2rem",
            borderRadius: "0.5rem",
            border: "none"
          }}
        />
        <input
          type="number"
          placeholder="소요 시간 (초)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            flex: "1 1 150px",
            padding: "1rem",
            fontSize: "1.2rem",
            borderRadius: "0.5rem",
            border: "none"
          }}
        />
        <button onClick={handleAddEntry} style={{
          padding: "1rem 1.5rem",
          fontSize: "1.2rem",
          borderRadius: "0.5rem",
          border: "none",
          backgroundColor: "#ffffff",
          color: "black",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          등록
        </button>
      </div>

      {/* 테이블 */}
      <div style={{
  backgroundColor: "rgba(255,255,255,0.15)",
  padding: "0",
  borderRadius: "1.5rem",
  boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
  width: "90vw",
  maxWidth: "1200px",
  overflow: "hidden"
}}>
  <table style={{
    width: "100%",
    color: "white",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: "1.5rem",
    textAlign: "center",
  }}>
    <thead>
      <tr style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        fontWeight: "bold",
        position: "sticky",
        top: 0,
        zIndex: 2
      }}>
        <th style={{ padding: "1.2rem", background: "rgba(0,0,0,0.6)" }}>등수</th>
        <th style={{ padding: "1.2rem", background: "rgba(0,0,0,0.6)" }}>닉네임</th>
        <th style={{ padding: "1.2rem", background: "rgba(0,0,0,0.6)" }}>소요 시간</th>
      </tr>
    </thead>
  </table>

  {/* ✅ 스크롤 가능한 tbody만 분리 */}
  <div style={{
    maxHeight: "50vh",
    overflowY: "auto"
  }}>
    <table style={{
      width: "100%",
      color: "white",
      borderCollapse: "separate",
      borderSpacing: 0,
      fontSize: "1.5rem",
      textAlign: "center"
    }}>
      <tbody>
        {ranking.map((entry) => (
          <tr key={entry.id} style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.2)"
          }}>
            <td style={{ padding: "1.2rem", fontWeight: "bold" }}>{entry.rank}</td>
            <td style={{ padding: "1.2rem", fontWeight: "bold" }}>{entry.nickname}</td>
            <td style={{ padding: "1.2rem", fontWeight: "bold" }}>{formatDuration(entry.duration)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
  );
};

export default RankingApp;
