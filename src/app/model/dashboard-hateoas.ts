export class Link {
  href: string;

  constructor(href: string) {
    this.href = href;
  }
}

export class DashboardLink{
  cultivos: Link
  alertas: Link
  recommendation: Link
  learning: Link

  constructor(data: any) {
    this.cultivos = new Link(data.cultivos.href);
    this.alertas = new Link(data.alertas.href);
    this.recommendation = new Link(data.recommendation.href);
    this.learning = new Link(data.learning.href);
  }
}

export class DashboardHateoas {
  _links: DashboardLink;

  constructor(data: any) {
    this._links = new DashboardLink(data._links);
  }
}
