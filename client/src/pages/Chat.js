import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import '../style/Chat.css'
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from 'react-bootstrap/Button';
// import Navbar from 'react-bootstrap/Navbar';
import Print_message from '../component/Print_message';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
    MDBInputGroup,
    MDBScrollbar,
    MDBBtn
} from "mdb-react-ui-kit";


function Chat({ socket }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [friend, setFriend] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [_room, setRoom] = useState("");
    const [friend_select, get_friend_select] = useState([])

    useEffect(() => {
        // socket.emit("connection", username)
        // socket.on("get_friend", function (data) {
        //     console.log(data)
        //     get_friend_select(data)
        // })
        // socket.emit("GetUserName", "");
        // socket.on("UserName", function (data) {
        //     sessionStorage.setItem("user_name", data);
        // })
    }, []);

    const join_friend = async () => {
        var items = [sessionStorage.getItem("user_name"), friend];
        items.sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }));
        setRoom(items[0] + "_" + items[1])
        console.log(items)
        socket.emit('join_friend', items[0] + "_" + items[1]);
        socket.on("r_mess_first", function (data) {
            console.log("hey")
            console.log(data)
            setMessageList(data)
        });
    }


    const sendMessage = async () => {
        console.log(socket.id)
        console.log(_room)
        if (currentMessage !== "") {
            const msg = {
                username: sessionStorage.getItem("user_name"),
                text: currentMessage,
                room: _room
            };

            await socket.emit('s_mess', msg);
            setCurrentMessage("");
        }
    }
    socket.on("r_mess", function (data) {
        if (data !== []) {
            if (messageList.length !== 0) {
                setMessageList([...messageList, data])
            } else {
                setMessageList([data])
            }
        }
    });

    socket.on("get_list_user", function (data) {
        console.log("coucou" + data)
    })

    socket.emit("join_room", _room)

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <MDBCol>
                    <MDBCard style={{ borderRadius: "15px" }} >
                        <MDBCardBody className='Col'>
                            <MDBCol>
                                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                    <input
                                        type="text"
                                        className="form-control-plaintext form-control-lg"
                                        value={friend}
                                        placeholder="Select a friend"
                                        onChange={(event) => {
                                            setFriend(event.target.value);
                                        }}
                                        onKeyPress={(event) => {
                                            event.key === "Enter" && join_friend();
                                        }}
                                    />

                                    <MDBBtn onClick={join_friend}><MDBIcon fas icon="fa-sharp fa-solid fa-filter" /></MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol >
                <MDBCol>
                    <MDBCard style={{ borderRadius: "15px" }}>
                        <MDBCardBody className='Col'>
                            <MDBCol>
                                <MDBRow>
                                    <ScrollToBottom className="Chat">
                                        <Print_message _messageList={messageList} />
                                    </ScrollToBottom>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol>
                                        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                            <input
                                                type="text"
                                                className="form-control-plaintext form-control-lg"
                                                value={currentMessage}
                                                placeholder="Entrer votre message"
                                                onChange={(event) => {
                                                    setCurrentMessage(event.target.value);
                                                }}
                                                onKeyPress={(event) => {
                                                    event.key === "Enter" && sendMessage();
                                                }}
                                            />

                                            {/* <button onClick={sendMessage}><MDBIcon fas icon="paper-plane" /></button> */}

                                            <MDBBtn onClick={sendMessage}><MDBIcon fas icon="paper-plane" /></MDBBtn>
                                        </div>
                                    </MDBCol>

                                </MDBRow>
                            </MDBCol>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow >
        </MDBContainer >



    );
}

export default Chat;