/**
 * TravelAgency Domain Entity
 *
 * Represents a travel agency partner in the system.
 * Contains business logic methods for checking agency status and validation.
 */
export class TravelAgencyEntity {
  id: string;
  name: string;
  tel: string | null;
  address: string | null;
  note: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById: string | null;
  updatedById: string | null;

  /**
   * Check if the travel agency is currently active
   */
  isActiveAgency(): boolean {
    return this.isActive;
  }

  /**
   * Check if the agency has contact information
   */
  hasContactInfo(): boolean {
    return !!this.tel || !!this.address;
  }

  /**
   * Get display name for the agency
   */
  getDisplayName(): string {
    return this.name;
  }
}
