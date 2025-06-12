import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {HomeComponent} from "./website/home/home.component";
import {
  OnboardingCreateCompanyComponent
} from "./kreatiu/onboarding-create-company/onboarding-create-company.component";
import {
  OnboardingCreatePromotionComponent
} from "./kreatiu/onboarding-create-promotion/onboarding-create-promotion.component";
import {OnboardingSuscribeComponent} from "./kreatiu/onboarding-suscribe/onboarding-suscribe.component";
import {
  OnboardingSubscribeTransferComponent
} from "./kreatiu/onboarding-subscribe-transfer/onboarding-subscribe-transfer.component";
import {PanelComponent} from "./kreatiu/panel/panel.component";
import {OnboardingWelcomeComponent} from "./kreatiu/onboarding-welcome/onboarding-welcome.component";
import {PreRegisterSuccessfulComponent} from "./kreatiu/pre-register-successful/pre-register-successful.component";
import {HowItWorksComponent} from "./website/how-it-works/how-it-works.component";
import {CookiesComponent} from "./website/legal/cookies/cookies.component";
import {AvisoLegalComponent} from "./website/legal/aviso-legal/aviso-legal.component";
import {PoliticaDePrivacidadComponent} from "./website/legal/politica-de-privacidad/politica-de-privacidad.component";
import {PromotionComponent} from "./kreatiu/panel/promotion/promotion.component";
import {BrandsComponent} from "./kreatiu/panel/brands/brands.component";
import {HomeInfluencersComponent} from "./website/home-influencers/home-influencers.component";
import {PlannerComponent} from "./influencers/planner/planner.component";
import {EditorComponent} from "./influencers/studio/youtube/long/editor/editor.component";
import {FrameComponent} from "./influencers/studio/components/frame/frame.component";
import {EditorScenesComponent} from "./influencers/studio/youtube/long/editor-scenes/editor-scenes.component";
import {EditorScriptComponent} from "./influencers/studio/youtube/long/editor-script/editor-script.component";
import {IndexComponent} from "./influencers/studio/youtube/long/index/index.component";
import {TeleprompterComponent} from "./influencers/studio/youtube/long/teleprompter/teleprompter.component";
import {EsPageComponent} from "./website/es-page/es-page.component";
import {EnPageComponent} from "./website/en-page/en-page.component";
import {CatPageComponent} from "./website/cat-page/cat-page.component";
import {PlansComponent} from "./influencers/account/plans/plans.component";
import {CharacterComponent} from "./influencers/account/character/character.component";
import {AccountFrameComponent} from "./influencers/account/account-frame/account-frame.component";

export const routes: Routes = [
  {path: '', component: EnPageComponent},
  {path: 'en', component: EnPageComponent},
  {path: 'es', component: EsPageComponent},
  {path: 'cat', component: CatPageComponent},
  // {path: 'influencers/planner', component: PlannerComponent},
  {path: 'influencers',  redirectTo: 'influencers/studio/youtube/long', pathMatch: 'full'},
  {path: 'influencers/studio/youtube/long', component: FrameComponent, children: [
      {path: '', component: EditorComponent},
      {path: 'scenes/:long_video_project_uuid', component: EditorScenesComponent},
      {path: 'script/:long_video_project_uuid', component: EditorScriptComponent},
      {path: 'index', component: IndexComponent},
    ]
  },
  {path: 'influencers/studio/youtube/long/teleprompter', component: TeleprompterComponent},
  {
    path: 'influencers/account', component: AccountFrameComponent, children: [
      {path: 'plans', component: PlansComponent},
      {path: 'character', component: CharacterComponent},
    ]
  },
  {path: 'legal/cookies', component: CookiesComponent},
  {path: 'legal/aviso-legal', component: AvisoLegalComponent},
  {path: 'legal/politica-de-privacidad', component: PoliticaDePrivacidadComponent},
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: 'en/how-it-works', component: HowItWorksComponent},
  {path: 'es/how-it-works', component: HowItWorksComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pre-register-successful', component: PreRegisterSuccessfulComponent},
  {path: 'onboarding-welcome', component: OnboardingWelcomeComponent},
  {path: 'onboarding-company', component: OnboardingCreateCompanyComponent},
  {path: 'onboarding-company/:new', component: OnboardingCreateCompanyComponent},
  {path: 'onboarding-promotion', component: OnboardingCreatePromotionComponent},
  {path: 'onboarding-promotion/:company_uuid', component: OnboardingCreatePromotionComponent},
  {path: 'onboarding-subscribe', component: OnboardingSuscribeComponent},
  {path: 'onboarding-subscribe/:promotion_uuid', component: OnboardingSuscribeComponent},
  {path: 'onboarding-subscribe-transfer', component: OnboardingSubscribeTransferComponent},
  {
    path: 'panel', component: PanelComponent, children: [
      {path: '', component: BrandsComponent},
      {path: 'promotion/:promotion_uuid', component: PromotionComponent}
    ]
  },
  // {path: 'panel/promotion/:promotion_uuid', component: PromotionComponent}
];
