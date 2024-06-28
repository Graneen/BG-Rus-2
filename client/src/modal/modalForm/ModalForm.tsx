import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateGameSession } from "../../features/gameSessionSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import ModalMap from "../modalMap/ModalMap";
import axios from "axios"; 
import "./ModalForm.css";


interface ModalFormProps {
  
 
  onCloseModal: () => void;
  }

  const ModalForm: React.FC<ModalFormProps> = ({ onCloseModal }) => {
  const { date, gameName, maxPlayers, venue } = useSelector((state: RootState) => state.gameSession);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [locationAddress, setLocationAddress] = useState(venue);
  const [gameNameInput, setGameNameInput] = useState(gameName);
  const [maxPlayersInput, setMaxPlayersInput] = useState(maxPlayers);
  const [timeInput, setTimeInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const displayMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/game-meetings/news", {
        game_id: null,
        name: nameInput,
        gameName: gameNameInput,
        maxPlayers: maxPlayersInput,
        location: locationAddress,
        date,
        time: timeInput,
      });
  
      displayMessage("Игровая сессия успешно создана!");
      console.log("Game Meeting created:", response.data);
  
      dispatch(updateGameSession({ gameName: gameNameInput, maxPlayers: maxPlayersInput, venue: locationAddress }));
  
      
      setTimeout(() => {
        onCloseModal(); 
      }, 3000);
    } catch (error) {
      console.error("Error creating Game Meeting:", error);
      displayMessage("Ошибка при создании игровой сессии.");
    }
  };

  const handleLocationSelected = (location: { lat: number; lng: number }) => {
    setLocationAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
    setShowMapModal(false);
  };

  const handleLocationAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationAddress(e.target.value);
  };

  const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameNameInput(e.target.value);
  };

  const handleMaxPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPlayersInput(parseInt(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  return (
    <div className="modal bg-black-200 px-4 py-4"> 
    <div className="modal-content bg-yellow-200 p-4 rounded-md shadow-md">
    {showMessage && <div className="message">{message}</div>}  
      <h3 className="text-black">Детали</h3>
      <form onSubmit={handleFormSubmit} className="text-black">
        <label>Данные: {date}</label>
        <input type="text" value={nameInput} placeholder="Имя организатора" onChange={handleNameChange} className="mt-2 px-3 py-2 border rounded w-full" />
        <input type="text" value={gameNameInput} placeholder="Название игры" onChange={handleGameNameChange} className="mt-2 px-3 py-2 border rounded w-full" />
        <input type="number" value={maxPlayersInput} placeholder="Количество игроков" onChange={handleMaxPlayersChange} className="mt-2 px-3 py-2 border rounded w-full" />
        <input type="time" value={timeInput} placeholder="Время (ЧЧ:ММ)" onChange={handleTimeChange} className="mt-2 px-3 py-2 border rounded w-full" />
        <div className="input-with-icon mt-2">
          <input
            type="text"
            value={locationAddress}
            placeholder="Место проведения"
            onChange={handleLocationAddressChange}
            className="px-3 py-2 border rounded w-full"
          />
          <FaMapMarkerAlt className="map-icon text-yellow-500 cursor-pointer" onClick={() => setShowMapModal(true)} />
        </div>
        {showMapModal && (
          <ModalMap
            isOpen={showMapModal}
            onClose={() => setShowMapModal(false)}
            onLocationSelected={handleLocationSelected}
          />
        )}
        <button type="submit" className="mt-4 bg-yellow-500 text-white font-semibold py-2 px-4 rounded">Создать</button>
      </form>
    </div>
  </div>
  );
  }

export default ModalForm;