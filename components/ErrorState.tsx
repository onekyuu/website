import React, { FC } from "react";
import { Button } from "./ui/button";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Link } from "@/i18n/navigations";
import { useRouter } from "next/navigation";
import ContentContainer from "./ContentContainer";

interface ErrorStateProps {
  title: string;
  description: string;
  errorMessage?: string;
  showBackButton?: boolean;
  backToHome?: boolean;
  homeHref?: string;
  homeLabel?: string;
  backLabel?: string;
}

const ErrorState: FC<ErrorStateProps> = ({
  title,
  description,
  errorMessage,
  showBackButton = true,
  backToHome = true,
  homeHref = "/",
  homeLabel = "Back to Home",
  backLabel = "Go Back",
}) => {
  const router = useRouter();

  return (
    <ContentContainer>
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-50">
          {title}
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-2 max-w-md">
          {description}
        </p>
        {errorMessage && (
          <p className="text-sm text-red-500 mb-6 max-w-md">{errorMessage}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          {showBackButton && (
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {backLabel}
            </Button>
          )}
          {backToHome && (
            <Link href={homeHref}>
              <Button>
                <Home className="w-4 h-4 mr-2" />
                {homeLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </ContentContainer>
  );
};

export default ErrorState;
