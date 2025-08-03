import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {showError} from "@/admin-utils/lib/formErrors";
import {showSuccess} from "@/admin-utils/lib/formSuccess";
import {patchUser, postUser} from "../_api/createUser";
import useSWRMutation from "swr/mutation";
import {imageUpload} from "@/admin-utils/utils/imageUpload";
import {getUserTrackingId, setUserTrackingId, updateUserTrackingId} from "@/lib/access-token";
import {isFile} from "@/lib/utils";
import {useEffect, useMemo} from "react";
import {useBasicInfo} from "../../_hooks/useBasicInfo";
import {useParams} from "next/navigation";
import { useSWRConfig } from "swr";
import { GetAllMembersResponse, Member } from "../../_types/member";

interface UserApiResponse {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  dob?: string;
  image?: string;
  phone?: string;
  origin?: string;
  gender?: string;
  age?: number;
  relationshipStatus?: string;
  children?: boolean;
  religion?: string;
  shortDescription?: string;

  educationCareer?: any;
  personalityBehavior?: any;
  partnerExpectation?: any;
  lifestyle?: any;
  hobbiesInterests?: any;
  language?: any;
  living?: any;
  physicalAppearance?: any;
}

const createUserSchema = (requirePassword: boolean) => z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: requirePassword
    ? z.string().min(6, "Password is required and must be at least 6 characters")
    : z.string().optional(),
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Role is required"),
  dob: z.string().min(1, "Date of birth is required"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  phone: z.string().min(1, "Phone is required"),
  origin: z.string().min(1, "Origin is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z.coerce.number().min(1, "Age is required"),
  relationshipStatus: z.string().min(1, "Relationship status is required"),
  children: z.boolean({ required_error: "Children is required" }),
  religion: z.string().min(1, "Religion is required"),
  shortDescription: z.string().min(1, "Short description is required"),
});

export type CreateUserFormValues = z.infer<ReturnType<typeof createUserSchema>>;

export default function useCreateUserForm() {
 const { mutate:globalMutate } = useSWRConfig(); 
  const params = useParams();
  const tracker = getUserTrackingId();

  const id = useMemo(() => {
    const paramId = Array.isArray(params.id) ? params.id[0] : params.id;
    return tracker?.id ?? paramId;
  }, [params.id, tracker?.id]);

  const allowEdit = useMemo(() => {
    return id || tracker?.basicInformation;
  }, [id, tracker?.basicInformation]);

  const schema = useMemo(() => createUserSchema(!allowEdit), [allowEdit]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    reset,
    control,
    watch,
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: undefined,
      username: "",
      firstName: "",
      lastName: "",
      role: "CLIENT",
      dob: "",
      image: undefined,
      phone: "",
      origin: "",
      gender: "",
      age: 18,
      relationshipStatus: "",
      children: false,
      religion: "",
      shortDescription: "",
    },
    mode: "onBlur",
  });

  const { user, userLoading } = useBasicInfo();

  useEffect(() => {
    if (id && user) {
      const u = user as UserApiResponse;
      reset({
        email: u.email || "",
        password: undefined,
        username: u.username || "",
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        role: u.role || "CLIENT",
        dob: u.dob ? u.dob.split("T")[0] : "",
        image: u.image || undefined,
        phone: u.phone || "",
        origin: u.origin || "",
        gender: u.gender || "",
        age: u.age || 18,
        relationshipStatus: u.relationshipStatus || "",
        children: u.children ?? false,
        religion: u.religion || "",
        shortDescription: u.shortDescription || "",
      });

      setUserTrackingId({
        id: id || "",
        basicInformation: true,
        educationAndCareer: !!u.educationCareer,
        personalityAndBehavior: !!u.personalityBehavior,
        partnerExpectation: !!u.partnerExpectation,
        lifeStyle: !!u.lifestyle,
        hobbiesAndInterest: !!u.hobbiesInterests,
        languages: !!u.language,
        living: !!u.living,
        aboutMe: !!u.physicalAppearance,
      });
    }
  }, [user, id]);

  const { trigger, isMutating } = useSWRMutation(
      "createOrUpdateUser",
      async (_: string, { arg }: { arg: CreateUserFormValues }) => {
        let imageUrl = "";
        if (isFile(arg.image)) imageUrl = await imageUpload(arg.image);
        else if (typeof arg.image === "string") imageUrl = arg.image;

        if (id && allowEdit) {
          return await patchUser(id, { ...arg, image: imageUrl });
        } else {
          return await postUser({ ...arg, image: imageUrl });
        }
      },
      {
        onError: (error: any) => {
          showError({ message: error?.message || "Failed to add user" });
        },
        revalidate: false,
        populateCache: false,
      }
  );

  const onSubmit = async (values: CreateUserFormValues, callback?: (data: any) => void) => {
    const imageUrl =
        isFile(values.image) ? await imageUpload(values.image as File) : (values.image as string);

    // Create a temporary user object for optimistic update
    const tempUser: Partial<Member> = {
      id: id || `temp-${Date.now()}`,
      email: values.email,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role,
      dob: values.dob,
      image: imageUrl,
      phone: values.phone,
      origin: values.origin,
      gender: values.gender,
      age: values.age,
      relationshipStatus: values.relationshipStatus,
      children: values.children,
      religion: values.religion,
      shortDescription: values.shortDescription,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Member;

    // Optimistic update - update the cache before the API call completes
    if (!id) {
      globalMutate(
        (key) => typeof key === 'string' && key.startsWith('all-members'),
        (current: GetAllMembersResponse | undefined) => {
          if (!current) return current;
          return {
            ...current,
            users: [tempUser, ...current.users],
            stats: {
              ...current.stats,
              total: current.stats.total + 1,
            },
            pagination: {
              ...current.pagination,
              total: current.pagination.total + 1,
            },
          };
        },
        false
      );
    }

    const result = await trigger({ ...values, image: imageUrl });

    if (result?.status === 200 || result?.status === 201) {
      showSuccess("User updated successfully!");

      // Update the cache with the actual response data
      globalMutate(
        (key) => typeof key === 'string' && key.startsWith('all-members'),
        (current: GetAllMembersResponse | undefined) => {
          if (!current) return current;
          const updatedUser = result.response as Member;
          let users: Member[];

          if (id) {
            users = current.users.map(u => u.id === updatedUser.id ? updatedUser : u);
          } else {
            // Replace the temporary user with the actual user from the response
            users = current.users.filter(u => u.id !== tempUser.id);
            users = [updatedUser, ...users];
          }

          return {
            ...current,
            users,
            stats: {
              ...current.stats,
              total: id ? current.stats.total : current.stats.total + 1,
            },
            pagination: {
              ...current.pagination,
              total: id ? current.pagination.total : current.pagination.total + 1,
            },
          };
        },
        false
      );

      // Invalidate the query to fetch the correct data
      globalMutate(
        (key) => typeof key === 'string' && key.startsWith('all-members'),
      );
      callback?.(result.response);
      if (id) {
        updateUserTrackingId({ basicInformation: true });
      }
      else {
        setUserTrackingId({
          id: result.response.id,
          basicInformation: true,
          educationAndCareer: false,
          personalityAndBehavior: false,
          partnerExpectation: false,
          lifeStyle: false,
          hobbiesAndInterest: false,
          languages: false,
          living: false,
          aboutMe: false,
        });
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting || isMutating,
    setValue,
    reset,
    control,
    watch,
    onSubmit,
    userLoading
  };
} 
