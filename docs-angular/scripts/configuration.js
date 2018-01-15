"use strict";

 angular.module('myApp.config', [])

.constant('ENV', 
		{	
			appVersion: '1.1',
			name:'DEV',
			// apiEndpoint:'https://istanze-dichiarazioni.comune.rimini.it/federa',
			// apiEndpoint:'https://pmlab.comune.rimini.it/simplesaml',
			apiEndpoint:'http://10.10.6.63:9989',
			apiLogin:'passportauth/login',
			apiLogout:'passportauth/logout',
			apiLoginCheck:'passportauth/check',
			apiProfile: 'profilemgr/me',
			apiUpload:'segnalazioni/upload',
			apiLoginNTLM:'loginmgr/NTLMlogin',
			apiLoginDEMO:'loginmgr/DEMOlogin',
			apiLoginLDAP:'loginmgr/LDAPlogin',
			apiLogoutLDAP:'loginmgr/LDAPlogout',
			apiPosta:'postamgr/posta',
			apiPostaCDC:'postamgr/cdc',
			apiQueue:'queuemgr',
			apiElezioni:'elezioni',
			routeAfterLogon:'elencoAtti',
			mapsdemo: false,
			debugFormDefaultData: true, // carica dati di default nella schermata 
			loginUserName:'',
			loginUserPassword:'',

			AUTH_EVENTS:{
				loginSuccess:'auth-login-success',
				loginFailed:'auth-login-failed',
				logoutSuccess:'auth-logout-success',
				sessionTimeout:'auth-session-timeout',
				notAuthenticated:'auth-not-authenticated',
				notAuthorized:'auth-not-authorized',
				serverError:'server-error',
				oldAppVersion:'old-app-version'
			},

			USER_ROLES:{
				all:'*',
				admin:'admin',
				editor:'editor',
				guest:'guest'
			}
		});