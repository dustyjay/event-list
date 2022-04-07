interface ArtistModel {
  thumb_url: string;
  mbid: string;
  facebook_page_url: string;
  image_url: string;
  tracker_count: number;
  tracking: Array<any>;
  upcoming_event_count: number;
  url: string;
  support_url: string;
  name: string;
  options: {
    display_listen_unit: boolean;
  };
  links: {
    type: string;
    url: string;
  }[];
  artist_optin_show_phone_number: boolean;
  id: string;
}

interface VenueModel {
  country: string;
  city: string;
  latitude: string;
  name: string;
  location: string;
  region: string;
  longitude: string;
}

interface OffersModel {
  type: string;
  url: string;
  status: string;
}

class EventModel {
  offers: OffersModel[];
  venue: VenueModel;
  starts_at: number;
  artist: ArtistModel;
  festival_datetime_display_rule: string;
  description: string;
  lineup: string[];
  festival_start_date: string;
  bandsintown_plus: boolean;
  title: string;
  artist_id: string;
  url: string;
  datetime_display_rule: string;
  datetime: string;
  on_sale_datetime: string;
  id: string;
  ends_at: string;
  festival_end_date: string;

  hasVip?: boolean;
  amount?: string;

  constructor(obj: EventModel) {
    this.offers = obj.offers ?? [];
    this.venue = obj.venue ?? {};
    this.starts_at = obj.starts_at;
    this.artist = obj.artist ?? {};
    this.festival_datetime_display_rule = obj.festival_datetime_display_rule;
    this.description = obj.description;
    this.lineup = obj.lineup ?? [];
    this.festival_start_date = obj.festival_start_date;
    this.bandsintown_plus = obj.bandsintown_plus;
    this.title = obj.title;
    this.artist_id = obj.artist_id;
    this.url = obj.url;
    this.datetime_display_rule = obj.datetime_display_rule;
    this.datetime = obj.datetime;
    this.on_sale_datetime = obj.on_sale_datetime;
    this.id = obj.id;
    this.ends_at = obj.ends_at;
    this.festival_end_date = obj.festival_end_date;

    //  computed properties
    this.hasVip = _findVipTickets(this.offers);
    this.amount = _getRandomAmount();
  }
}

// checking if VIP tickets are available
function _findVipTickets(offers: OffersModel[]) {
  const vipTickets = offers.filter(
    ({ type, status }) => type === 'VIP' && status === 'available'
  );
  return vipTickets?.length > 0;
}

// asserting a random number (in thousands) between 5000 and 50000
function _getRandomAmount() {
  const number = Math.floor(Math.random() * (50 - 5 + 1) + 5) * 1000;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(number);
}

export default EventModel;
