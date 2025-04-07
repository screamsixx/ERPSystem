import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {
    user: string = "";
    password: string = "";

    constructor(
        private messageService: MessageService,
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) { }

    login() {
        this.authService.login(this.user, this.password).subscribe({
            next: (response) => {
                if(this.user === 'admin' && this.password === 'admin') {
                    // Guardar datos en localStorage
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('username', response.username);
                    localStorage.setItem('rol', response.rol);

                    // Notificación de éxito
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Inicio de sesión exitoso',
                        detail: 'Redirigiendo al sistema...',
                        life: 5000  // Duración extendida a 5 segundos
                    });

                    // Redirigir al dashboard después de 5 segundos
                    setTimeout(() => {
                        this.router.navigate(['/']);
                    }, 5000);
                } else {
                    // Notificación de credenciales incorrectas
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error de autenticación',
                        detail: 'Usuario o contraseña incorrectos',
                        life: 3000
                    });
                }
            },
            error: (error) => {
                // Notificación de error del servidor
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error del servidor',
                    detail: 'No se pudo conectar con el servicio de autenticación',
                    life: 3000
                });
            }
        });
    }
}
