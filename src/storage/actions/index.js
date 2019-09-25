import {sessionAdd, chooseProperty, chooseGroup} from './session_actions';
import {propertiesLoad, propertiesAdd} from './property_actions';
import {propertiesHealthLoad} from './property_health_actions';
import {roomTypesLoad, roomTypesAdd, roomTypesDrop} from './room_type_actions';
import {ratePlansLoad, ratePlansAdd, ratePlansDrop} from './rate_plan_actions';
import {rateCategoriesLoad, rateCategoriesAdd, rateCategoriesDrop} from './rate_category_actions';
import {channelsLoad, channelsAdd, channelsDrop} from './channel_actions';
import {channelsHealthLoad} from './channel_health_actions';
import {channelActionsLoad} from './channel_action_actions';
import {emailTemplatesLoad, emailTemplatesAdd, emailTemplatesDrop} from './email_template_actions';
import {userAdd} from './current_user_actions';
import {usersLoad, usersAdd, usersDrop} from './user_actions';
import {whiteLabelPartnersLoad, whiteLabelPartnersAdd, whiteLabelPartnersDrop} from './white_label_partner_actions';
import {whiteLabelDomainsLoad, whiteLabelDomainsAdd, whiteLabelDomainsDrop} from './white_label_domain_actions';
import {
  whiteLabelEmailSettingsLoad,
  whiteLabelEmailSettingsAdd,
  whiteLabelEmailSettingsDrop
} from './white_label_email_settings_actions';
import { tasksLoad } from './tasks_actions';
import {groupsLoad, groupsAdd, groupsDrop} from './group_actions';
import {bookingsLoad, bookingsAdd} from './booking_actions';
import {issuesLoad, issuesAdd} from './issue_actions';

export default {
  sessionAdd,
  chooseProperty,
  chooseGroup,

  propertiesLoad,
  propertiesHealthLoad,
  propertiesAdd,

  roomTypesLoad,
  roomTypesAdd,
  roomTypesDrop,

  ratePlansLoad,
  ratePlansAdd,
  ratePlansDrop,

  rateCategoriesLoad,
  rateCategoriesAdd,
  rateCategoriesDrop,

  channelsLoad,
  channelsAdd,
  channelsDrop,
  channelsHealthLoad,
  channelActionsLoad,

  emailTemplatesLoad,
  emailTemplatesAdd,
  emailTemplatesDrop,

  userAdd,
  usersLoad,
  usersAdd,
  usersDrop,

  whiteLabelPartnersLoad,
  whiteLabelPartnersAdd,
  whiteLabelPartnersDrop,

  whiteLabelDomainsLoad,
  whiteLabelDomainsAdd,
  whiteLabelDomainsDrop,

  whiteLabelEmailSettingsLoad,
  whiteLabelEmailSettingsAdd,
  whiteLabelEmailSettingsDrop,

  tasksLoad,

  groupsLoad,
  groupsAdd,
  groupsDrop,

  bookingsLoad,
  bookingsAdd,

  issuesLoad,
  issuesAdd
};
