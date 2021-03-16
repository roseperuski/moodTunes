import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMusicComponent } from './search-music/search-music.component';
import { ResultsComponent } from './search-music/results/results.component';
// import { PlaylistsComponent } from './playlists/playlists.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: SearchMusicComponent },
  { path: 'results', component: ResultsComponent },
  // { path: 'playlists', component: PlaylistsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
