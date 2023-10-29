import React, { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import useAuth from "../../../hooks/useAuth";
import Navbar from "../../../components/Navbar/navbar";
import InputMask from "react-input-mask";
import styles from "./Cart.module.css"

function Cart() {
    const { getUserAddresses, getCep } = useApi();
    const { token } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(""); // ID do endereço selecionado

    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        const fetchAddresses = async () => {
            const data = await getUserAddresses(token);
            setAddresses(data);
        };
        fetchAddresses();
    }, [token]);

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handleAddAddress = (event) => {
        event.preventDefault();

        // Crie um novo objeto de endereço com os campos
        const newAddress = {
            zip,
            street,
            number,
            city,
            neighborhood,
            state,
        };

        // Adicione o novo endereço à lista de endereços
        setAddresses([...addresses, newAddress]);

        // Limpe os campos de entrada
        setZip("");
        setState("");
        setCity("");
        setNeighborhood("");
        setStreet("");
        setNumber("");
        setComplement("");
        setLatitude("");
        setLongitude("");
    };

    const handleCepChange = async () => {
        const response = await getCep(zip.split("-").join(""));
        console.log(response);
        if (response) {
            setState(response.state);
            setCity(response.city);
            setNeighborhood(response.neighborhood);
            setStreet(response.street);
            setLatitude(response.location.coordinates.latitude);
            setLongitude(response.location.coordinates.longitude);
        } else {
            alert("CEP inválido ou não encontrado.");
        }
    };
 
    return (
        <div>
            <Navbar /> 

            <div >
            <h1 className={styles.titulo}>Selecione um endereço</h1>
            <div className={styles.container}>
            <form className={styles.cardForm}>
                {addresses.map((address, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`address-${index}`}
                            name="address"
                            value={index}
                            checked={selectedAddress === index.toString()}
                            onChange={handleAddressChange}
                        />
                        <label className={styles.labelForm} htmlFor={`address-${index}`}>
                            {address.zip}, {address.street}, {address.number} - {address.city}/{address.state}
                        </label>
                    </div>
                ))}
            </form>

            
            <form className={styles.cardForm1} onSubmit={handleAddAddress}>
                    <h1>Adicione um endereço</h1>
                <div className={styles.groupInput}>
               
            <div>
                    <label htmlFor="zip">CEP:</label>
                    <InputMask
                        mask="99999-999"
                        maskChar=""
                        value={zip}
                        onChange={(e) => setZip(e.target.value)} // Atualize o estado zip
                        placeholder="88888-888"
                        id="zip"
                        type="text"
                        required
                        onBlur={handleCepChange}
                    />
                </div>
                <div>
                    <label htmlFor="street">Logradouro:</label>
                    <input
                        type="text"
                        id="street"
                        value={street}
                        placeholder="Logradouro"
                        onChange={(event) => setStreet(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="complement">Complemento:</label>
                    <input
                        type="text"
                        id="complement"
                        value={complement}
                        placeholder="Complemento"
                        onChange={(event) => setComplement(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="number">Número:</label>
                    <input
                        type="text"
                        id="number"
                        value={number}
                        placeholder="Número"
                        onChange={(event) => setNumber(event.target.value)}
                        required
                    />
                </div>
                </div>

                <div className={styles.groupInput}>
                <div>
                    <label htmlFor="state">Estado:</label>
                    <input
                        type="text"
                        id="state"
                        value={state}
                        placeholder="Estado"
                        onChange={(event) => setState(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">Cidade:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        placeholder="Cidade"
                        onChange={(event) => setCity(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="text"
                        id="latitude"
                        value={latitude}
                        placeholder="Latitude"
                        onChange={(event) => setLatitude(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="text"
                        id="longitude"
                        value={longitude}
                        placeholder="Longitude"
                        onChange={(event) => setLongitude(event.target.value)}
                    />
                </div>
                </div>
                <button className={styles.buttonAdiconar} type="submit">Adicionar</button>
            </form>
        </div>
        </div>
        </div>
    );
}

export default Cart;
