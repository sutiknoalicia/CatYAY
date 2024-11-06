import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NavigationRoute() {
  return <NavigationScreen />;
}
// Type Definitions
interface NavigationStep {
  id: number;
  instruction: string;
  imageUrl: any;
  icon: IconNames;
  estimatedTime: number;
  details: string;
}

type IconNames = 
  | 'directions-sign'
  | 'check-in'
  | 'card-reader'
  | 'ticket'
  | 'train'
  | 'gate';

interface NavigationScreenState {
  currentStep: number;
  totalTime: number;
  isLoading: boolean;
}

// Route Data
// Route Data
const HKIA_TO_SKYPIER_ROUTE: NavigationStep[] = [
    {
    id: 1,
    instruction: "Follow signs to Mainland/Macau Ferries",
    imageUrl: require('@/assets/images/mainland-ferry-signs.png'),
    icon: 'navigate-outline', // Changed from 'directions-sign'
    estimatedTime: 5,
    details: "Look for clear signage directing to Mainland/Macau Ferries, not Transfer gate"
    },
    {
    id: 2,
    instruction: "Check in at TurboJET counter",
    imageUrl: require('@/assets/images/turbojet-counter.png'),
    icon: 'boat-outline', // Already correct
    estimatedTime: 10,
    details: "Located at Level 5, Transfer Area E2"
    },
    {
    id: 3,
    instruction: "Use Ferry Ticket Reader at boarding gate",
    imageUrl: require('@/assets/images/ferry-reader.png'),
    icon: 'card-outline', // Changed from 'card-reader'
    estimatedTime: 2,
    details: "Alternative check-in method available at Level 5"
    },
    {
    id: 4,
    instruction: "Present SkyPier ferry ticket at APM entrance",
    imageUrl: require('@/assets/images/apm-entrance.png'),
    icon: 'ticket-outline', // Changed to include '-outline'
    estimatedTime: 3,
    details: "Have your ticket ready for verification"
    },
    {
    id: 5,
    instruction: "Take APM to SkyPier",
    imageUrl: require('@/assets/images/apm.png'),
    icon: 'train-outline', // Changed to include '-outline'
    estimatedTime: 5,
    details: "Automated People Mover will transport you to SkyPier"
    },
    {
    id: 6,
    instruction: "Follow signs to your boarding gate",
    imageUrl: require('@/assets/images/boarding-gate.png'),
    icon: 'enter-outline', // Changed from 'gate'
    estimatedTime: 5,
    details: "Clear directional signs will guide you to your specific boarding gate"
    }
];

interface Route {
    id: string;
    name: string;
    from: string;
    to: string;
    steps: NavigationStep[];
  }
  
  // Create multiple routes
  const AVAILABLE_ROUTES: Route[] = [
    {
      id: 'hkia-skypier',
      name: 'HKIA to SkyPier',
      from: 'HKIA',
      to: 'SkyPier',
      steps: HKIA_TO_SKYPIER_ROUTE
    },
    // Add more routes as needed
  ];
  
  // Create a Route Selector Component
  interface RouteSelectorProps {
    selectedRoute: Route | null;
    onRouteSelect: (route: Route) => void;
  }
  
  const RouteSelector: React.FC<RouteSelectorProps> = ({
    selectedRoute,
    onRouteSelect
  }) => {
    const [showPicker, setShowPicker] = useState(false);
  
    return (
      <ThemedView style={styles.routeSelectorContainer}>
        <TouchableOpacity 
          style={styles.routeSelector}
          onPress={() => setShowPicker(true)}
        >
          {selectedRoute ? (
            <ThemedText>{`${selectedRoute.from} → ${selectedRoute.to}`}</ThemedText>
          ) : (
            <ThemedText>Select Route</ThemedText>
          )}
          <Ionicons name="chevron-down" size={24} color="#4A90E2" />
        </TouchableOpacity>
  
        {showPicker && (
          <ThemedView style={styles.routePickerModal}>
            {AVAILABLE_ROUTES.map(route => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeOption}
                onPress={() => {
                  onRouteSelect(route);
                  setShowPicker(false);
                }}
              >
                <ThemedText>{`${route.from} → ${route.to}`}</ThemedText>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPicker(false)}
            >
              <ThemedText>Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ThemedView>
    );
  };

// Navigation Step Card Component
interface NavigationStepCardProps {
  step: NavigationStep;
  isActive: boolean;
}

const NavigationStepCard: React.FC<NavigationStepCardProps> = React.memo(({ 
    step, 
    isActive 
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
  
    return (
      <ThemedView style={[styles.stepCard, isActive && styles.activeStepCard]}>
        <View style={styles.stepHeader}>
          <Ionicons name={step.icon} size={24} color="#4A90E2" />
          <ThemedText type="defaultSemiBold">{`Step ${step.id}`}</ThemedText>
          <ThemedText>{`${step.estimatedTime} mins`}</ThemedText>
        </View>
        <View style={styles.imageContainer}>
          {!imageError ? (
            <Image 
              source={step.imageUrl} 
              style={styles.stepImage}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={48} color={CATHAY_COLORS.darkGray} />
              <ThemedText style={styles.imagePlaceholderText}>Image not available</ThemedText>
            </View>
          )}
          {!imageLoaded && !imageError && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={CATHAY_COLORS.primary} />
            </View>
          )}
        </View>
        <ThemedText style={styles.instruction}>{step.instruction}</ThemedText>
        <ThemedText>{step.details}</ThemedText>
      </ThemedView>
    );
  });

// Navigation Progress Component
interface NavigationProgressProps {
  steps: number;
  currentStep: number;
  onStepPress: (step: number) => void;
}

const NavigationProgress: React.FC<NavigationProgressProps> = ({
  steps,
  currentStep,
  onStepPress
}) => {
  return (
    <View style={styles.progressContainer}>
      {Array.from({ length: steps }).map((_, index) => (
        <View key={index} style={styles.progressStep}>
          <TouchableOpacity 
            onPress={() => onStepPress(index)}
            style={[
              styles.progressDot,
              index <= currentStep ? styles.activeDot : styles.inactiveDot
            ]} 
          />
          {index < steps - 1 && (
            <View style={[
              styles.progressLine,
              index < currentStep ? styles.activeLine : styles.inactiveLine
            ]} />
          )}
        </View>
      ))}
    </View>
  );
};

// Navigation Controls Component
interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext
}) => {
  return (
    <View style={styles.navigationControls}>
      <TouchableOpacity 
        style={[styles.navButton, currentStep === 0 && styles.disabledButton]}
        onPress={onPrevious}
        disabled={currentStep === 0}
      >
        <ThemedText style={styles.buttonText}>Previous</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navButton, currentStep === totalSteps - 1 && styles.disabledButton]}
        onPress={onNext}
        disabled={currentStep === totalSteps - 1}
      >
        <ThemedText style={styles.buttonText}>Next</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

// Error Boundary Component
class NavigationErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemedView style={styles.errorContainer}>
          <ThemedText>Something went wrong with the navigation.</ThemedText>
          <TouchableOpacity 
            onPress={() => this.setState({ hasError: false })}
            style={styles.retryButton}
          >
            <ThemedText>Retry</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      );
    }
    return this.props.children;
  }
}

// Update the NavigationScreen component
export const NavigationScreen: React.FC = () => {
    const [state, setState] = useState<NavigationScreenState & {
      selectedRoute: Route | null;
    }>({
      currentStep: 0,
      totalTime: 0,
      isLoading: false,
      selectedRoute: null
    });
  
    const handleRouteSelect = (route: Route) => {
      setState(prev => ({
        ...prev,
        selectedRoute: route,
        currentStep: 0,
        totalTime: route.steps.reduce((acc, step) => acc + step.estimatedTime, 0)
      }));
    };
  
    return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationErrorBoundary>
        <ThemedView style={styles.mainContainer}>
          <ThemedView style={styles.container}>
            <RouteSelector
              selectedRoute={state.selectedRoute}
              onRouteSelect={handleRouteSelect}
            />
  
            {state.selectedRoute ? (
              <>
                <ThemedView style={styles.header}>
                  <ThemedText type="title">
                    {`${state.selectedRoute.from} → ${state.selectedRoute.to}`}
                  </ThemedText>
                  <ThemedText>{`Estimated time: ${state.totalTime} mins`}</ThemedText>
                </ThemedView>
  
                <NavigationProgress 
                  steps={state.selectedRoute.steps.length}
                  currentStep={state.currentStep}
                  onStepPress={step => setState(prev => ({ ...prev, currentStep: step }))}
                />
  
                {/* Show only the current step */}
                <ThemedView style={styles.stepContainer}>
                  <NavigationStepCard 
                    step={state.selectedRoute.steps[state.currentStep]}
                    isActive={true}
                  />
                </ThemedView>
              </>
            ) : (
              <ThemedView style={styles.noRouteContainer}>
                <ThemedText>Please select a route to begin navigation</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
  
          {state.selectedRoute && (
            <NavigationControls 
              currentStep={state.currentStep}
              totalSteps={state.selectedRoute.steps.length}
              onPrevious={() => setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
              onNext={() => setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))}
            />
          )}
        </ThemedView>
      </NavigationErrorBoundary>
      </SafeAreaView>
    );
  };
const CATHAY_COLORS = {
    primary: '#006564',      // Cathay's signature teal/green
    secondary: '#8D1D41',    // Burgundy red
    white: '#FFFFFF',
    lightGray: '#F4F4F4',
    darkGray: '#4D4D4F',
    border: '#E5E5E5',
    success: '#28a745',
    disabled: '#C5C5C5'
};
  
const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 250,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: CATHAY_COLORS.lightGray,
      },
      stepImage: {
        width: '100%',
        height: '100%',
      },
      loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
      imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CATHAY_COLORS.lightGray,
      },
      imagePlaceholderText: {
        marginTop: 8,
        color: CATHAY_COLORS.darkGray,
      },
    safeArea: {
        flex: 1,
        backgroundColor: CATHAY_COLORS.white,
      },
    mainContainer: {
        flex: 1,
        backgroundColor: CATHAY_COLORS.white,
    },
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    headerIcon: {
        color: CATHAY_COLORS.primary,
        alignSelf: 'center',
        marginBottom: 16,
    },
    // Route Selector Styles
    routeSelectorContainer: {
        marginBottom: 20,
        zIndex: 1000,
        position: 'relative',
    },
    routeSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: CATHAY_COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: CATHAY_COLORS.border,
        shadowColor: CATHAY_COLORS.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    routePickerModal: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: CATHAY_COLORS.white,
        borderRadius: 8,
        shadowColor: CATHAY_COLORS.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 8,
        zIndex: 1001,
    },
    routeOption: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: CATHAY_COLORS.border,
    },
    closeButton: {
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: CATHAY_COLORS.lightGray,
        borderRadius: 8,
    },
    // Step Card Styles
    stepCard: {
        width: '100%',
        padding: 20,
        borderRadius: 12,
        backgroundColor: CATHAY_COLORS.white,
        shadowColor: CATHAY_COLORS.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    activeStepCard: {
        borderColor: CATHAY_COLORS.primary,
        borderWidth: 2,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    stepImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    instruction: {
        fontSize: 18,
        lineHeight: 24,
        color: CATHAY_COLORS.darkGray,
        textAlign: 'center',
        marginBottom: 12,
        fontWeight: '600',
    },
    // Progress Styles
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    progressStep: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    activeDot: {
        backgroundColor: CATHAY_COLORS.primary,
    },
    inactiveDot: {
        backgroundColor: CATHAY_COLORS.lightGray,
    },
    progressLine: {
        flex: 1,
        height: 2,
    },
    activeLine: {
        backgroundColor: CATHAY_COLORS.primary,
    },
    inactiveLine: {
        backgroundColor: CATHAY_COLORS.lightGray,
    },
    // Navigation Controls Styles
    navigationControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: CATHAY_COLORS.white,
        borderTopWidth: 1,
        borderTopColor: CATHAY_COLORS.border,
    },
    navButton: {
        padding: 15,
        backgroundColor: CATHAY_COLORS.primary,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: CATHAY_COLORS.disabled,
    },
    buttonText: {
        color: CATHAY_COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Loading and Error States
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noRouteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    retryButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: CATHAY_COLORS.primary,
        borderRadius: 8,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
});