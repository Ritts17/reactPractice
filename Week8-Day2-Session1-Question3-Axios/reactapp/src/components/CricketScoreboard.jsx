import React, { useEffect, useState } from 'react'
import axios from 'axios';

function CricketScoreboard() {
  const MATCH_URL = 'https://ide-bfbabcfbf334750465ceedaafdfefone.premiumproject.examly.io/proxy/3001/matches';
  const [matchList, setMatchList] = useState([])
  const [editingId, setEditingId] = useState('');
  const [editingScore, setEditingScore] = useState('')
  const [editingOver, setEditingOver] = useState('')
   const [editingState, setEditingState] = useState(false);

  const fetchMatchData = async () => {
    try {
      const response = await axios.get(MATCH_URL)
      const data = response.data;
      setMatchList(data);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }

  useEffect(() => {
    fetchMatchData();
  }, []);

  const handleEdit = (matchId) => {
    console.log(matchId);

    const currentMatch = matchList.find(match => match.id === matchId);
    if(currentMatch) {
      setEditingScore(currentMatch.score);
      setEditingOver(currentMatch.overs.toString());
    }
    setEditingState(true);
    setEditingId(matchId);
  }

  const handleOverChange = (e) => {
    setEditingOver(e.target.value);
  }

  const handleScoreChange = (e) => {
    setEditingScore(e.target.value);
  }
  
  const handleSave = async () => {
    try {
      const updateData = {
        score : editingScore,
        overs : parseInt(editingOver)
      }

      await axios.put(`${MATCH_URL}/${editingId}`, updateData);

      setMatchList(prevMatches =>
        prevMatches.map(match =>
          match.id === editingId
          ? {...match, score : editingScore, overs : parseInt(editingOver)} : match));

      setEditingId('');
      setEditingState(false);
      setEditingScore('');
      setEditingOver('');
    } catch (error) {
      console.error("Update error:", error.message);
    }
  }
  return (
    <div>
      <h1>Cricket Scoreboard</h1>
      {matchList.length === 0 ? (<div>No matches have been added yet</div>) : (
        <>
        <ul>
          {
            matchList.map((match, index) => (
              <li key={match.id}>
                {/* {`${match.teamA} vs ${match.teamB} - ${match.score} in ${match.overs} overs `}<button className='edit-btn' onClick={() => handleEdit(match.id)}>Edit</button> */}
                <span>{match.teamA} vs {match.teamB}</span> - <span>{match.score} in {match.overs} overs</span>
                <button className='edit-btn' onClick={() => handleEdit(match.id)}>Edit</button>


                {editingState && editingId === match.id ? (
                  <>
                  <input 
                  name=''
                  type='text'
                  placeholder='Score'
                  value={editingScore}
                  onChange={handleScoreChange}
                  />

                  <input 
                  name=''
                  type='text'
                  placeholder='Overs'
                  value={editingOver}
                  onChange={handleOverChange}
                  />

                  <button onClick={handleSave}>Save</button>
                  </>
                ) : (
                  <></>
                )}
              </li>
            ))
          }
        </ul>
        </>
      )}

    </div>
  )
}

export default CricketScoreboard