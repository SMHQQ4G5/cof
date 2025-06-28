import { inject, Injectable } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { AuthService } from "@coloroffortune/core/services/auth/auth.service";

export const authGuard : CanActivateFn = () => {
    const authService = inject(AuthService);

    return new Observable<boolean>(o => {
        authService.getMyInfo().subscribe({
            next: (info: any) => {
                if(info.authenticated) {
                    o.next(true);
                }
            },
            error: (err) => {
                o.next(false);
            }
        })
    });
}