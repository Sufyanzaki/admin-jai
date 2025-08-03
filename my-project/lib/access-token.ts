"use client"

type UserTrackingIdDto = {
  id: string;
  basicInformation: boolean;
  educationAndCareer: boolean;
  personalityAndBehavior: boolean;
  partnerExpectation: boolean;
  lifeStyle: boolean;
  hobbiesAndInterest: boolean;
  languages: boolean;
  living: boolean;
  aboutMe: boolean;
}

const userKey = "userTrackingId";

export function setUserTrackingId(value: UserTrackingIdDto): void {
  localStorage.setItem(userKey, JSON.stringify(value));
}

export function getUserTrackingId(): UserTrackingIdDto | null {
  const value = localStorage.getItem(userKey);
  return value ? JSON.parse(value) : null;
}

export function updateUserTrackingId(value: object): void {
  const tracker = getUserTrackingId();
  if (tracker) {
    localStorage.setItem(userKey, JSON.stringify({ ...tracker, ...value }));
  }
}

export function clearUserTrackingId(): void {
  localStorage.removeItem(userKey);
}