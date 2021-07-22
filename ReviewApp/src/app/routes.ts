import { Routes } from "@angular/router";

import { UserComponent } from "./Components/user/user.component";
import { SignupComponent } from "./Components/user/signup/signup.component";
import { SigninComponent } from "./Components/user/signin/signin.component";
import { HomeComponent } from "./Components/home/home.component";

import { AuthGuard } from "./Auth/auth.guard";
import { CreateReviewComponent } from "./Components/create-review/create-review.component";
import { ViewReviewComponent } from "./Components/view-review/view-review.component";

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignupComponent }]

    },
    {
        path: 'signin', component: UserComponent,
        children: [{ path: '', component: SigninComponent }]

    },
    {
        path: 'home',component:HomeComponent, canActivate:[AuthGuard]
    },
    {
        path: 'create',component:CreateReviewComponent, canActivate:[AuthGuard]
    },
    {
        path: 'view',component:ViewReviewComponent, canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/home', pathMatch:'full'
    }
]
