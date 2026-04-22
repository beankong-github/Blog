---
title: Actors & Components
sidebar_position: 1
---

# Actors & Components

## Actor 기본

UE에서 모든 월드 오브젝트는 `AActor`를 상속합니다.

```cpp
UCLASS()
class MYGAME_API AMyActor : public AActor
{
    GENERATED_BODY()

public:
    AMyActor();

protected:
    virtual void BeginPlay() override;

public:
    virtual void Tick(float DeltaTime) override;

private:
    UPROPERTY(VisibleAnywhere)
    UStaticMeshComponent* MeshComponent;
};
```

## Component 추가

```cpp
AMyActor::AMyActor()
{
    PrimaryActorTick.bCanEverTick = true;

    MeshComponent = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("MeshComponent"));
    RootComponent = MeshComponent;
}
```
