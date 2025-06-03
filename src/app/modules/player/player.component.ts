import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player/player.service';
import { Player } from 'src/app/core/models/player/player';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  players!: Player[];
  dataPlayers!: Player[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: number[] = [5, 10, 15];
  searchTextList: string[] = [];
  searchedPlayer: string = '';

  constructor(
    private playerService: PlayerService,
    private notifyService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchPlayers();
  }

  async fetchPlayers() {
    this.players = [];
    this.dataPlayers = [];
    await this.loaderService.waitFor(1500);
    this.playerService.getPlayers().subscribe(
      (data) => {
        data.forEach((item: any) => {
          let player = new Player();
          player.playerId = item.playerId;
          player.playerName = item.playerName;
          player.playerId = item.playerId;
          player.countryName = item.countryName;
          player.height = item.height;
          player.weight = item.weight;
          player.dob = item.dob;
          player.primaryPosition = item.primaryPosition;
          player.primaryPositionId = item.primaryPositionId;
          player.secondaryPosition = item.secondaryPosition;
          player.secondaryPositionId = item.secondaryPositionId;
          player.image_url = item.image_url;
          player.isEdited = false;
          player.isNew = false;
          this.players.push(player);
          this.searchTextList.push(player.playerName);
        });
        this.notifyService.showInfo(
          'Fetched player data!!',
          'Notification',
          5000
        );
        this.dataPlayers = this.players;
        //console.log(data, 'players');
      },
      (err) => console.error(err)
    );
  }
  onResetPlayer(row: Player) {
    if (row.isNew) {
      let index = this.players.findIndex((d) => d.playerId === row.playerId);
      this.players.splice(index, 1);
    } else {
      row.isEdited = false;
    }
  }
  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onAddPlayer() {
    var newPlayer = new Player();
    newPlayer.isEdited = true;
    newPlayer.isNew = true;
    this.players.unshift(newPlayer);
    this.page = 1;
  }

  onEditPlayer(row: Player) {
    row.isEdited = true;
    console.log('Player edit clicked!!', JSON.stringify(row));
  }
  onImageSelected(event: any, row: Player) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        row.image_url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async onUpdatePlayer(row: Player) {
    await this.loaderService.waitFor(500);
    if (row.isNew) {
      let indexToUpdate = this.dataPlayers.findIndex(
        (item) => item.playerId == row.playerId
      );
      const validIds = this.dataPlayers
        .map((item) => item.playerId)
        .filter((id) => id !== null && id !== undefined);
      var maxId = Math.max(...validIds);
      row.playerId = maxId + 1;
      row.isEdited = false;
      row.isNew = false;
      this.dataPlayers[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.playerName + ' is added to Player List',
        'Notification',
        3000
      );
    } else {
      let indexToUpdate = this.dataPlayers.findIndex(
        (item) => item.playerId == row.playerId
      );
      row.isEdited = false;
      this.dataPlayers[indexToUpdate] = row;
      this.notifyService.showInfo(
        row.playerName + ' Player is updated',
        'Notification',
        3000
      );
    }
    this.players = this.dataPlayers;
  }

  async onDeletePlayer(row: Player) {
    await this.loaderService.waitFor(500);
    this.dataPlayers = this.dataPlayers.filter(
      (item) => item.playerId !== row.playerId
    );
    this.players = this.dataPlayers;
    this.notifyService.showInfo(
      row.playerName + ' is deleted',
      'Notification',
      3000
    );
  }
}
