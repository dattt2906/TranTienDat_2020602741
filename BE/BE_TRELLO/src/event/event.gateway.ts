import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    
  } from "@nestjs/websockets";
  import io,{ Server, Socket } from "socket.io";
  
  @WebSocketGateway(8001, {
    cors: {
      origin: '*',
    }
  })
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly connectedClients: Map<string, Socket> = new Map();

    
  
    @WebSocketServer()
     server: Server;
  
    handleConnection(socket: Socket) {
      console.log("connect", socket.id);
      this.connectedClients.set(socket.id, socket);
    }
  
    handleDisconnect(socket: Socket) {
      console.log("disconnect", socket.id);
      this.connectedClients.delete(socket.id);
    }
    @SubscribeMessage("add-column")
    handleAddColumn(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-add-column","add-column")
    }
    @SubscribeMessage("add-card")
    handleAddCard(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-add-card","add-card")
    }
    @SubscribeMessage("del-column")
    handleDelColumn(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-del-column","del-column")
    }
  
    @SubscribeMessage("del-card")
    handleDelCard(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-del-card","del-card")
    }

    @SubscribeMessage("drag-column")
    handleDragColumn(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-drag-column","drag-column")
    }
    @SubscribeMessage("drag-card")
    handleDragCard(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-drag-card","drag-card")
    }
    @SubscribeMessage("add-deadline")
    handleAddDeadline(socket: Socket, roomId: string) {
      console.log(roomId)
      // socket.join(roomId);
      this.server.to(roomId).emit("message-add-deadline","add-deadline")
    }


    @SubscribeMessage("join-room")
    handleJoinRoom(socket: Socket, roomId: string) {
      console.log(roomId)
      socket.join(roomId);
      this.server.to(roomId).emit("message","Hello from server")
    }
  
    @SubscribeMessage("message")
    handleSentMessage(socket: Socket, payload: any): void {
      const { roomId, content } = payload;
      this.server.to(roomId).emit("message", content);
    }
  
    // @SubscribeMessage("add-card")
    // handleAddCard(socket: Socket, payload: any): void {
    //   const { boardId, content } = payload;
    //   this.server.to(boardId).emit("add-card", content);
    // }
    @SubscribeMessage("server-event")
    handleServerEvent(socket:Socket, data:any):void{

        data="Day la su kien goi tu server"
        this.server.emit("server-event", data);
    }

  
  }