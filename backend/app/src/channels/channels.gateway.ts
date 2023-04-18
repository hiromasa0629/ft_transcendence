import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { ChannelsService } from "./channels.service";
import { Body, Inject, Logger, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Socket, Namespace } from 'socket.io'
import { GatewayChannelsMiddleware } from "./channels.middleware";
import { PrismaService } from "src/app.service";
import { PrismaClient } from "@prisma/client";
import { ChannelsSocketMessageDto } from "./channels.dto";
import { SocketExceptionFilter } from "src/exceptions/ws_exception.filter";
import { WsAuthGuard } from "src/guards/auth.guards";
import { GatewayUserId } from "src/decorators/user_id.decorators";

@UsePipes(new ValidationPipe({
	forbidNonWhitelisted: true,
	whitelist: true,
}))
@UseFilters(new SocketExceptionFilter())
@WebSocketGateway({
	namespace: 'channels',
})
export class ChannelsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private readonly logger = new Logger(ChannelsGateway.name);
	constructor(
		private readonly channelsService: ChannelsService,
		@Inject(PrismaService) private readonly prisma: PrismaClient
	) {}
	
	@WebSocketServer() io: Namespace;
	
	afterInit() {
		this.logger.log('Channels WebSocket gatewat initialized');
		this.io.use(GatewayChannelsMiddleware(this.channelsService, this.prisma));
	}
	
	handleConnection(client: Socket, ...args: any[]) { console.log(`client ${client.id} connected!`) }
	
	handleDisconnect(client: Socket) { console.log(`client ${client.id} disconnected`) }
	
	@UseGuards(WsAuthGuard)
	@SubscribeMessage('channelMessages')
	async handleChannelMessages(@ConnectedSocket() client: Socket, @MessageBody() body: ChannelsSocketMessageDto, @GatewayUserId() auth_user_id: string) {
		console.log('auth_user_id', auth_user_id);
		console.log('body', body)
		const channelId: number = parseInt(client.handshake.query.id.toString())
		const created = await this.channelsService.createChannelMessages(channelId, body, auth_user_id);
		if (created) this.io.emit('channelMessages', created); // emit or broadcast ?
		else throw new WsException('Channel message sent failed');
	}
}